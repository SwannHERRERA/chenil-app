use std::env;

use deadpool::managed::{Manager, Pool};
use lapin::{ConnectionProperties, Connection};
use log::{error, info};
use serenity::async_trait;
use serenity::model::channel::Message;
use serenity::model::gateway::Ready;
use serenity::prelude::*;


const AMQP_POOL_MAX_SIZE: usize = 10;


struct Handler {
    pool: Pool<Manager>,
}


async fn get_rmq_con(pool: Pool<Manager>) -> RMQResult<Connection> {
    let connection = pool.get().await?;
    Ok(connection)
}


#[async_trait]
impl EventHandler for Handler {
   async fn message(&self, ctx: Context, msg: Message) {
        if msg.content == "!ping" {
            if let Err(why) = msg.channel_id.say(&ctx.http, "Pong!").await {
                error!("Error sending message: {:?}", why);
            }
        }
        let rmq_con = get_rmq_con(self.pool).await.map_err(|e| {
            error!("can't connect to rmq, {}", e);
        })?;

        let channel = rmq_con.create_channel().await.map_err(|e| {
            error!("can't create channel, {}", e);
        })?;
    }

    // Set a handler to be called on the `ready` event. This is called when a
    // shard is booted, and a READY payload is sent by Discord. This payload
    // contains data like the current user's guild Ids, current user data,
    // private channels, and more.
    async fn ready(&self, _: Context, ready: Ready) {
        info!("{} is connected!", ready.user.name);
    }
}

#[tokio::main]
async fn main() {
    pretty_env_logger::init();
    dotenv::dotenv().ok();
    let token = env::var("DISCORD_TOKEN").expect("Expected a token in the environment");
    let amqp_addr = env::var("AMQP_URL").expect("Expecter an URL in the environment");
    let manager = Manager::new(amqp_addr, ConnectionProperties::default().with_tokio());
    let pool: Pool<Manager> = deadpool::managed::Pool::builder(manager)
        .max_size(AMQP_POOL_MAX_SIZE)
        .build()
        .expect("can create pool");
    let intents = GatewayIntents::GUILD_MESSAGES
        | GatewayIntents::DIRECT_MESSAGES
        | GatewayIntents::MESSAGE_CONTENT;

    let handler = Handler { pool };
    let mut client =
        Client::builder(&token, intents).event_handler(handler).await.expect("Err creating client");

    if let Err(why) = client.start().await {
        error!("Client error: {:?}", why);
    }
}
