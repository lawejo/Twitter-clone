PRAGMA foreign_keys = ON;
PRAGMA foreign_keys;

--------------------------------------------------
-- Section USERS
DROP TABLE IF EXISTS users;
CREATE TABLE users(
    user_id                     TEXT    UNIQUE NOT NULL,
    user_username               TEXT    UNIQUE NOT NULL,
    user_first_name             TEXT    NOT NULL, 
    user_last_name              TEXT    DEFAULT "",
    user_total_followers        INTEGER DEFAULT 0,
    user_total_following        INTEGER DEFAULT 0,
    user_total_tweets           INTEGER DEFAULT 0,
    user_avatar                 TEXT    UNIQUE,
    user_cover_image            TEXT    UNIQUE ,
    user_description            TEXT,
    user_geo_location           TEXT,
    user_website                TEXT,
    user_created_at             TEXT    NOT NULL,  
    user_birthday               TEXT,
    user_birthmonth             TEXT,
    user_birthyear              TEXT,
    user_email                  TEXT    UNIQUE NOT NULL,
    user_password               TEXT    NOT NULL,
    user_verification_key       TEXT,
    user_verified_at            TEXT,
    user_reset_key              TEXT,
    user_inactive               TEXT    DEFAULT 0,
    user_inactivation_key       TEXT    DEFAULT 0,
    PRIMARY KEY(user_id)
) WITHOUT ROWID;

-- USER Lasse Jørgensen
INSERT INTO users VALUES("5c8ed6428a1c43d49dde09cba54d6506","lass876q","Lasse","Jørgensen",0,0,6,"5c8ed6428a1c43d49dde09cba54d6506.jpg","22e851609ed748a0be897cd434fd3b1d.jpg","Studying Webdevelopment at KEA","Copenhagen","mysite.com","January 2023","22","June","","lass876q@stud.kea.dk","$2y$10$xZT5mqQIzkXc7vXgna0YUet/MolRvfaoAlXL7RFLelMPIQBMP8K1C",
"","1","19ef3e8254524ed2848cc01884592e17",0,"68607efac74e4651a9bd8ec7078ae2d2");
-- USER Lili Reinhart
INSERT INTO users VALUES("24442dbb00ff429d92464e4957051da7","lilireinhart","Lili","Reinhart",0,0,6,"24442dbb00ff429d92464e4957051da7.jpg","88a5d662a1af4d308b49a103d2b0ccd7.jpg","(she/her) I take as many naps as I can. Look Both Ways on Netflix 🦋","","","May 2011","13","Septemper","","lilireinhart@stud.kea.dk","$2b$12$Zy8ibBVpLqprTGqwIrXPB.IB5AEv1sAveF8yq78pZQlIaATXiOrP6",
"","1","ea0f4e1a8f5048c388ae4e1525aaf3e1",0,"79ad9f95b4ca43049cfa4318018ff9cb");
-- USER Elon Musk
INSERT INTO users VALUES("c92060660fc446d78a5967cd719d285b","elonmusk","Elon","Musk",0,0,6,"c92060660fc446d78a5967cd719d285b.jpg","9b976a67a34a46c78618a0fa0febb172.jpg","","","","June 2009","","","","elonmusk@stud.kea.dk","$2b$12$Zy8ibBVpLqprTGqwIrXPB.IB5AEv1sAveF8yq78pZQlIaATXiOrP6",
"","1","3815e985896541d88ec450bf132efee0",0,"f6ff8fe6afea48eba0d57364f2eeb754");
-- USER CB Doge
INSERT INTO users VALUES("fd9271973f4e40898722162022a383a4","cb_doge","DogeDesigner","",0, 0, 6,"fd9271973f4e40898722162022a383a4.jpg","cec761ec5b164b46b986ca56f3f191a9.jpg","UX/UI & Graphic Designer at Dogecoin & MyDoge Inc.","Dogecoin.com","MyDoge.com","May 2021","","","","cbdoge@stud.kea.dk","$2b$12$Zy8ibBVpLqprTGqwIrXPB.IB5AEv1sAveF8yq78pZQlIaATXiOrP6",
"","1","a81b1a21dd3743979e5769fae5a9959c",0,"1337ab29509c4f35a2d7f85d2763608c");
-- USER Shakira 
-- INSERT INTO users VALUES("fd9271973f4e40898722162022a383a4","cb_doge","DogeDesigner","","786000", "420", "113000","fd9271973f4e40898722162022a383a4.jpg","cec761ec5b164b46b986ca56f3f191a9.jpg","UX/UI & Graphic Designer at Dogecoin & MyDoge Inc.","Dogecoin.com","MyDoge.com","May 2021","","","","cbdoge@stud.kea.dk","$2b$12$Zy8ibBVpLqprTGqwIrXPB.IB5AEv1sAveF8yq78pZQlIaATXiOrP6",
-- "","1","a81b1a21dd3743979e5769fae5a9959c",0,"1337ab29509c4f35a2d7f85d2763608c");


--------------------------------------------------
-- Section USERS_FOLLOWERS
DROP TABLE IF EXISTS followers;

CREATE TABLE followers(
follower_id           TEXT,
followee_id           TEXT,
PRIMARY KEY(follower_id, followee_id)
)WITHOUT ROWID;
--------------------------------------------------
-- INCREASE FOLLOWING - ING

DROP TRIGGER IF EXISTS increment_total_following;
CREATE TRIGGER increment_total_following AFTER INSERT ON followers
BEGIN
    UPDATE users
    SET user_total_following = user_total_following + 1
    WHERE user_id = NEW.follower_id;
END;

--------------------------------------------------
-- DECREASE FOLLOWING - ING

DROP TRIGGER IF EXISTS decrease_total_following;
CREATE TRIGGER decrease_total_following AFTER DELETE ON followers
BEGIN
    UPDATE users
    SET user_total_following = user_total_following - 1
    WHERE user_id = OLD.follower_id;
END;
--------------------------------------------------
-- INCREASE FOLLOWERS - ERS

DROP TRIGGER IF EXISTS increment_total_followers;
CREATE TRIGGER increment_total_followers AFTER INSERT ON followers
BEGIN
    UPDATE users
    SET user_total_followers = user_total_followers + 1
    WHERE user_id = NEW.followee_id;
END;

--------------------------------------------------
-- DECREASE FOLLOWERS - ERS

DROP TRIGGER IF EXISTS decrease_total_followers;
CREATE TRIGGER decrease_total_followers AFTER DELETE ON followers
BEGIN
    UPDATE users
    SET user_total_followers = user_total_followers - 1
    WHERE user_id = OLD.followee_id;
END;

--------------------------------------------------
SELECT name FROM sqlite_master WHERE type = 'view';
SELECT name FROM sqlite_master WHERE type = 'trigger';

--------------------------------------------------
-- INDEXES
CREATE INDEX idx_users_user_first_name ON users(user_first_name);
CREATE INDEX idx_users_user_last_name ON users(user_last_name);
CREATE INDEX idx_users_user_avatar ON users(user_avatar);

SELECT * FROM total_tweets;

SELECT name FROM sqlite_master WHERE type = 'index';
SELECT name FROM sqlite_master WHERE type = 'trigger';
SELECT name FROM sqlite_master WHERE type = 'views';

--------------------------------------------------
-- Section TWEETS
DROP TABLE IF EXISTS tweets;

CREATE TABLE tweets(
    tweet_id                  TEXT UNIQUE NOT NULL,
    tweet_user_fk             TEXT NOT NULL,
    tweet_created_at          TEXT NOT NULL,
    tweet_since_created       TEXT NOT NULL,
    tweet_message             TEXT,
    tweet_image               TEXT DEFAULT NULL,
    tweet_updated_at          TEXT DEFAULT 0,
    tweet_total_retweets      INTEGER DEFAULT 0,
    tweet_total_likes         INTEGER DEFAULT 0,
    tweet_total_views         INTEGER DEFAULT 0,
    tweet_total_replies       INTEGER DEFAULT 0,
    tweet_verified            TEXT,
    tweet_role                TEXT DEFAULT 0,
    PRIMARY KEY(tweet_id)
) WITHOUT ROWID;

-- USER Lasse Jørgensen = "5c8ed6428a1c43d49dde09cba54d6506"
INSERT INTO tweets VALUES("96eb710ba6df4b08b5c9276a7f7c9a47","5c8ed6428a1c43d49dde09cba54d6506","1","","","","0","0",0,"","0","","2");
-- RETWEET
INSERT INTO tweets VALUES("5d952d137e674d0ab01909bff22def70","5c8ed6428a1c43d49dde09cba54d6506","1674214929","","Så holder det","cfa86d50e2e64647b4538155c35ea357.JPG","0","0",0,"","0","","1");
INSERT INTO tweets VALUES("66e910f641624806b03473b01fa70752","5c8ed6428a1c43d49dde09cba54d6506","1672573329","","Fiestaa","3880601da1804c33a6117b6e72116cd2.JPG","0","0",0,"0","0","","1");
INSERT INTO tweets VALUES("cf65d83facd4405db56780606a13fbe8","5c8ed6428a1c43d49dde09cba54d6506","1672659729","","The gloves protect my feet from excess work.","15f001ad9a8c4e1e8691b4627dce0aee.JPG","0","0",0,"0","0","","1");
INSERT INTO tweets VALUES("b4ec816fb6f348b3921ea743776b8d62","5c8ed6428a1c43d49dde09cba54d6506","1672746129","","The hummingbird's wings blurred while it eagerly sipped the sugar water from the feeder.","c46665f70e0844968f5c385f952fb8b3.JPG","0","0",0,"0","0","","1");
INSERT INTO tweets VALUES("056270165b9e488582cc9592e3002fd5","5c8ed6428a1c43d49dde09cba54d6506","1672918929","","As time wore on, simple dog commands turned into full paragraphs explaining why the dog couldn’t do something.","c2c8e87aa0c5494c91b7a5de5364b18b.JPG","0","0",0,"0","0","","1");
INSERT INTO tweets VALUES("e2f20b93f038427988b2f82c28545ed3","5c8ed6428a1c43d49dde09cba54d6506","1673350929","","It took him a while to realize that everything he decided not to change, he was actually choosing.","d6460b2d5d2b4e4d8bf30057b07cdaf7.JPG","0","0",0,"0","0","","1");

-- USER Lili Reinhart = "24442dbb00ff429d92464e4957051da7"
INSERT INTO tweets VALUES("787385b2a1aa4404b9e603d507fffe15","24442dbb00ff429d92464e4957051da7","1676029329","","A la madre","1494be4beab045448fa562809d01c34f.jpg","0","0",0,"0","0","","1");
INSERT INTO tweets VALUES("9d589b0c5842429183b110fa7d426f49","24442dbb00ff429d92464e4957051da7","1684417476","","With a single flip of the coin, his life changed forever.","191ed4d023d846e4a2a7e5a23dee3090.jpg","0","0",0,"0","0","","1");
INSERT INTO tweets VALUES("21c4369a24064fe28cc1f8c4570e0063","24442dbb00ff429d92464e4957051da7","1676115729","","It's always a good idea to seek shelter from the evil gaze of the sun.","4f25d407c7524332acd44959e3255d5c.jpg","0","0",0,"0","0","","1");
INSERT INTO tweets VALUES("6986d8c8b6504953b5e54b1993b8ddd0","24442dbb00ff429d92464e4957051da7","1676547729","","The sunblock was handed to the girl before practice, but the burned skin was proof she did not apply it.","5b7ca757a3a34995a6476dd3e2775e68.jpg","0","0",0,"0","0","","1");
INSERT INTO tweets VALUES("85efe327f86f4d8190ee65af8e080d5c","24442dbb00ff429d92464e4957051da7","1676634129","","We have never been to Asia, nor have we visited Africa.","d3f93f718bb34e50b9e1da2409cf6ffc.jpg","0","0",0,"0","0","","1");
INSERT INTO tweets VALUES("9592e12833a94f76bada4399317bbbec","24442dbb00ff429d92464e4957051da7","1676806929","","He kept telling himself that one day it would all somehow make sense.","c6aa84a793fe43fd98dcda8ec29cd38a.jpg","0","0",0,"0","0","","1");

-- USER Elon Musk = "c92060660fc446d78a5967cd719d285b"
INSERT INTO tweets VALUES("b936dc1b16b04d469aea007af5925ee9","c92060660fc446d78a5967cd719d285b","1679226129","","Quivole","1dbde206c67c4e138b1751889a84cf90.jpg","0","0",0,"0","0","","1");
INSERT INTO tweets VALUES("be17134e22914447a0430411654b9302","c92060660fc446d78a5967cd719d285b","1677721329","","They improved dramatically once the lead singer left.","6c48b6dbbf674bd293988441ed984448.jpg","0","0",0,"0","0","","1");
INSERT INTO tweets VALUES("29ea74c371124bb69901f3ccc404ca3a","c92060660fc446d78a5967cd719d285b","1677807729","","Iguanas were falling out of the trees.","da7da1d32d0d427b84bebd6a26222cd6.jpg","0","0",0,"0","0","","1");
INSERT INTO tweets VALUES("1ed3587516d34a11a6b080889c399763","c92060660fc446d78a5967cd719d285b","1677894129","","He decided that the time had come to be stronger than any of the excuses he'd used until then.","e3a38a058588402597d750593e6c1364.jpg","0","0",0,"0","0","","1");
INSERT INTO tweets VALUES("8ca477943e8c4d679b3d09fde4dd3596","c92060660fc446d78a5967cd719d285b","1677980529","","Situps are a terrible way to end your day.","e8704b036f6a47d5b001de2107630aab.jpg","0","0",0,"0","0","","1");
INSERT INTO tweets VALUES("99c7a17eb9604d14884d3e25bcc5cb12","c92060660fc446d78a5967cd719d285b","1678153329","","It was a slippery slope and he was willing to slide all the way to the deepest depths.","fae84590951a46918e48f735309e7a77.jpg","0","0",0,"0","0","","1");

-- USER CB Doge = "fd9271973f4e40898722162022a383a4"
INSERT INTO tweets VALUES("83e7455d9f71433194d548322d93a27e","fd9271973f4e40898722162022a383a4","1680828129","","Nej nej nej","0f42e867eb124443a427230d918fde0a.jpg","0","0",0,"0","0","","1");
INSERT INTO tweets VALUES("2b3d464a7bb5432eac7dac0e33a0e9cb","fd9271973f4e40898722162022a383a4","1680396129","","We should play with legos at camp.","3755de04e4514d5ebf1b742e03ffb9e4.jpg","0","0",0,"0","0","","1");
INSERT INTO tweets VALUES("bc72a04a2ce84239b95e24fd5ba46a42","fd9271973f4e40898722162022a383a4","1680482529","","His mind was blown that there was nothing in space except space itself.","9fe0e18dda244a14834e275d669e1c8e.jpg","0","0",0,"0","0","","1");
INSERT INTO tweets VALUES("df2d4c3eca704e678b9f262ed01c6d67","fd9271973f4e40898722162022a383a4","1680655329","","It took him a month to finish the meal.","a7ec12e8cf2b4e5196bfdbad29265eee.jpg","f16e3cc550304979ae4d43d090ab708b.jpg","0",0,"0","0","","1");
INSERT INTO tweets VALUES("e5044d18702e415096db5d51189b2b57","fd9271973f4e40898722162022a383a4","1680828129","","He dreamed of leaving his law firm to open a portable dog wash.","f441ede6e1924ac3999b7229b613e263.jpg	","0","0",0,"0","0","","1");
INSERT INTO tweets VALUES("c0d23e51d16341cc81fedd560ce00d98","fd9271973f4e40898722162022a383a4","1681000929","","Nej nej nej","a7ec12e8cf2b4e5196bfdbad29265eee.jpg","0","0",0,"0","0","","1");


--------------------------------------------------
-- Section TWEETS_LIKES
DROP TABLE IF EXISTS tweets_likes;

CREATE TABLE tweets_likes(
tweet_like_tweet_fk    TEXT,
tweet_like_user_fk     TEXT,
PRIMARY KEY(tweet_like_tweet_fk, tweet_like_user_fk)
FOREIGN KEY(tweet_like_tweet_fk) REFERENCES tweets(tweet_id)
ON DELETE CASCADE
)WITHOUT ROWID;

--------------------------------------------------
-- INCREASE LIKES 

DROP TRIGGER IF EXISTS increment_total_likes;
CREATE TRIGGER increment_total_likes AFTER INSERT ON tweets_likes
BEGIN
    UPDATE tweets
    SET tweet_total_likes = tweet_total_likes + 1
    WHERE tweet_id = NEW.tweet_like_tweet_fk;
END;

--------------------------------------------------
-- DECREASE LIKES 

DROP TRIGGER IF EXISTS decrease_total_likes;
CREATE TRIGGER decrease_total_likes AFTER DELETE ON tweets_likes
BEGIN
    UPDATE tweets
    SET tweet_total_likes = tweet_total_likes - 1
    WHERE tweet_id = OLD.tweet_like_tweet_fk;
END;
--------------------------------------------------
-- Section TWEETS_RETWEETS
DROP TABLE IF EXISTS tweets_retweets;
-- tweet_retweet_tweet_fk is the ORIGINAL TWEET
-- tweet_retweet_retweet_fk is the RESPONSE TWEET
CREATE TABLE tweets_retweets(
tweet_retweet_id                  TEXT,
tweet_retweet_tweet_fk            TEXT,
tweet_retweet_retweet_fk          TEXT,
PRIMARY KEY(tweet_retweet_tweet_fk, tweet_retweet_retweet_fk)
FOREIGN KEY(tweet_retweet_tweet_fk) REFERENCES tweets(tweet_id)
ON DELETE CASCADE
)WITHOUT ROWID;
--------------------------------------------------
-- Section TWEETS_REPLIES
DROP TABLE IF EXISTS tweets_replies;

CREATE TABLE tweets_replies(
tweet_reply_id          TEXT,
tweet_reply_tweet_fk    TEXT,
tweet_reply_reply       TEXT,
PRIMARY KEY(tweet_reply_tweet_fk,tweet_reply_reply)
)WITHOUT ROWID;
--------------------------------------------------
-- INCREASE RETWEETS 

DROP TRIGGER IF EXISTS increment_total_retweets;
CREATE TRIGGER increment_total_retweets AFTER INSERT ON tweets_retweets
BEGIN
    UPDATE tweets
    SET tweet_total_retweets = tweet_total_retweets + 1
    WHERE tweet_id = NEW.tweet_retweet_tweet_fk;
END;

--------------------------------------------------
-- DECREASE RETWEETS 

DROP TRIGGER IF EXISTS decrease_total_retweets;
CREATE TRIGGER decrease_total_retweets AFTER DELETE ON tweets_retweets
BEGIN
    UPDATE tweets
    SET tweet_total_retweets = tweet_total_retweets - 1
    WHERE tweet_id = OLD.tweet_retweet_tweet_fk;
END;

--------------------------------------------------
-- Section TWEETS_ROLES
-- Role 1 = Tweet standard
-- Role 2 = Tweet retweet
-- Role 3 = Tweet reply
-- Role 4 = Tweet deleted

DROP TABLE IF EXISTS tweets_roles;

CREATE TABLE tweets_roles(
    tweet_role_id       TEXT,
    tweet_role_desc     TEXT,
    PRIMARY KEY(tweet_role_id, tweet_role_desc)
) WITHOUT ROWID;


--------------------------------------------------
-- Section TRENDS
DROP TABLE IF EXISTS trends;
CREATE TABLE trends(
trend_id              TEXT,
trend_topic           TEXT NOT NULL,
trend_total_tweets    TEXT DEFAULT 0,
trend_location        TEXT,
PRIMARY KEY(trend_id,trend_topic)
)WITHOUT ROWID;

INSERT INTO trends VALUES( "759369d0a02b4eee9188846298b62ed6","Denmark", 14700, "Trending in Denmark");
INSERT INTO trends VALUES( "05a382c5adab45f1b241a0733873268c","#dktrp", "", "Trending in Denmark");
INSERT INTO trends VALUES( "1f197498de154a1fa06f77653e657c6d","Amazon", "941", "Business & finance · Trending");
INSERT INTO trends VALUES( "94010d1a38404af68d8ffd49727ea518","Bill Gates", "27700", "Business & finance · Trending");
INSERT INTO trends VALUES( "6bcefee2da404297a7b0e8a48b558735","PFAS", "2.198", "Trending in Denmark");
INSERT INTO trends VALUES( "0f8fab7944c64615adaf00a452acdec5","Tyrkiet", "", "Business & finance · Trending");
INSERT INTO trends VALUES( "e764368c624145dcaffa3b19de15727f","Gmgm", "555", "Trending in Denmark");
INSERT INTO trends VALUES( "4ad86db2845547788b51412bc362f2c6","Queen", "223", "Music · Trending");
INSERT INTO trends VALUES( "af77975972fd47398ccf9af3f536a9ed","Viking", "9.678", "Trending in Denmark");
INSERT INTO trends VALUES( "d7d33dcf0bf74ddbafc131398086030f","Fischer", "3.934", "Trending in Denmark");


--------------------------------------------------
-- INCREASE TWEETS

DROP TRIGGER IF EXISTS increment_total_tweets;
CREATE TRIGGER increment_total_tweets AFTER INSERT ON tweets
BEGIN
    UPDATE users
    SET user_total_tweets = user_total_tweets + 1
    WHERE user_id = NEW.tweet_user_fk;
END;

--------------------------------------------------
-- DECREASE TWEETS

DROP TRIGGER IF EXISTS decrease_total_tweets;
CREATE TRIGGER decrease_total_tweets AFTER DELETE ON tweets
BEGIN
    UPDATE users
    SET user_total_tweets = user_total_tweets - 1
    WHERE user_id = OLD.tweet_user_fk;
END;

SELECT name FROM sqlite_master WHERE type = 'view';
SELECT name FROM sqlite_master WHERE type = 'trigger';

--------------------------------------------------

--------------------------------------------------
-- Whats sports_game

DROP TABLE IF EXISTS sports_games;

CREATE TABLE sports_games(
sports_game_id           TEXT,
sports_game_team_name    TEXT,
sports_game_score        TEXT,
sports_game_color        TEXT,
sports_game_league       TEXT,
sports_game_logo         TEXT,
sports_game_results      TEXT,
sports_game_tla          TEXT,
PRIMARY KEY(sports_game_id)
)WITHOUT ROWID;

INSERT INTO sports_games VALUES("848846aff50c4f37b6259d278e430218","Anaheim Ducks","2","#FC4C02","NHL","542501abdecd4619898ec267550ad86a.png","2","ANA");
INSERT INTO sports_games VALUES("88b7d512f4b24ed9bf4853b10b8422d4","Seattle Kraken","5","#355464","NHL","3263069875594c44be77b658970646be.png","1","SEA");
INSERT INTO sports_games VALUES("991ee384d7ee4129b7819f317b43a936","St. Louis Blues","2","#002F87","NHL","193384c9f15246b68411ed823c39ad4d.png","2","STL");
INSERT INTO sports_games VALUES("e2847072c8d24501bc32307b0450f01b","Arizona Coyotes","6","#8C2633","NHL","1aa1e142989b40ef8c2aa172df346ba7.png","1","ARI");
INSERT INTO sports_games VALUES("e8c7c59246c245d9a3b33f3f0ead3f5e","San Jose Sharks","0","#006D75","NHL","71390ab0ec5d4cab9549197f6893afce.png","2","SAN");
INSERT INTO sports_games VALUES("fb4dfc3059b446769f41ef82cf3db36d","Colorado Avalanche","6","#236192","NHL","a9c95103d3cd4984abc9b73ed5198a4c.png","1","COL");
INSERT INTO sports_games VALUES("bf2a3210b3ea4503a2002e7ca0b76abb","FC Bayern Munich","2","#DC052D","UEFA CHampions Leagues","7b2f4aa2894f4ae78499af0f37227f9b.png","1","FCB");
INSERT INTO sports_games VALUES("5a3a7d953c604cae9de6d5f9c2aa46fd","Parks Saint-Ger
","1","#004170","UEFA CHampions Leagues","913c781302224e9b8db23ca40a61c07c.png","2","PAR");
INSERT INTO sports_games VALUES("d85da123b4e147c08aae73d9d79c6790","Milwaukee Bucks","134","#00471B","NBA","3f0e58b4895f4a5a93db68d9b57b5090.png","1","MIL");
INSERT INTO sports_games VALUES("74ad88b24f3c46a384307f31482ec894","Orlando Magic","123","#007DC5","NBA","b9b7d354fa564b49a4b99426fa9b8353.png","2","ORL");
INSERT INTO sports_games VALUES("2360aac83ee14393a69636fd58a90faa","Philadelphia Flyers","2","#F74902","NHL","c9c5ca720f5148248a84b9f120fdbabe.png","2","PHI");
INSERT INTO sports_games VALUES("8a6ceb6ae4234b9d9114a7094f6d4115","Tamba Bay Lightning","5","#002868","NHL","c89006ef177346b89e8f0a19393d10eb.png","1","TAM");
INSERT INTO sports_games VALUES("476a1405ec14411ab8dc2167e3cdcafb","Memphis Grizzlies","103","#5D76A9","NBA","931b4fad29534e468b9db7de30c4832a.png","2","MEM");
INSERT INTO sports_games VALUES("25585c1a7dc54660acf372fc4cc11850","Los Angeles Lakers","112","#552582","NBA","5301177f356847b9817d49f8a3689753.png","1","LAL");

--------------------------------------------------
-- Whats sports_game_relations

DROP TABLE IF EXISTS sports_game_relations;

CREATE TABLE sports_game_relations(
sports_game_relation_id           TEXT,
sports_game_relation_teams_one    TEXT,
sports_game_relation_teams_two    TEXT,
PRIMARY KEY(sports_game_relation_id,sports_game_relation_teams_one)
)WITHOUT ROWID;

INSERT INTO sports_game_relations VALUES("42081ca86d6d454a9672a992aca3eab8","88b7d512f4b24ed9bf4853b10b8422d4","848846aff50c4f37b6259d278e430218");
INSERT INTO sports_game_relations VALUES("e9626973d4bc4539a5da0858c6efe2df","e2847072c8d24501bc32307b0450f01b","991ee384d7ee4129b7819f317b43a936");
INSERT INTO sports_game_relations VALUES("38d5b89bb4374b2a8284a30497654e86","fb4dfc3059b446769f41ef82cf3db36d","e8c7c59246c245d9a3b33f3f0ead3f5e");
INSERT INTO sports_game_relations VALUES("f807f514f964406bb797bd1800fa18ad","bf2a3210b3ea4503a2002e7ca0b76abb","5a3a7d953c604cae9de6d5f9c2aa46fd");
INSERT INTO sports_game_relations VALUES("74943f1fa43649feb735dd77ef901e46","d85da123b4e147c08aae73d9d79c6790","74ad88b24f3c46a384307f31482ec894");
INSERT INTO sports_game_relations VALUES("c9b13b03209a4f3c8c75bbbad37ccafc","8a6ceb6ae4234b9d9114a7094f6d4115","2360aac83ee14393a69636fd58a90faa");
INSERT INTO sports_game_relations VALUES("08718695d72d4bda8b3f4939c75af883","25585c1a7dc54660acf372fc4cc11850","476a1405ec14411ab8dc2167e3cdcafb");

--------------------------------------------------
-- Whats match_results

DROP TABLE IF EXISTS match_results;

CREATE TABLE match_results(
match_result_id            TEXT,
match_result_desc          TEXT,
PRIMARY KEY(match_result_id)
)WITHOUT ROWID;

INSERT INTO match_results VALUES("1","Winner");
INSERT INTO match_results VALUES("2","Loser");
INSERT INTO match_results VALUES("3","Draw");
--------------------------------------------------
-- VIEWS
-- DROP VIEW IF EXISTS users_by_name;
-- CREATE VIEW users_by_name AS SELECT * FROM USERS ORDER BY username desc;

DROP VIEW IF EXISTS sports_games_winners_losers;

CREATE VIEW sports_games_winners_losers AS 
SELECT 
sg.sports_game_id AS winner_id,
sg.sports_game_team_name AS winner_team_name,
sg.sports_game_score AS winner_score,
sg.sports_game_color AS winner_color,
sg.sports_game_league AS winner_league,
sg.sports_game_logo AS winner_logo,
sg.sports_game_results AS winner_results,
sg.sports_game_tla AS winner_tla,
sg2.sports_game_id AS loser_id,
sg2.sports_game_team_name AS loser_team_name,
sg2.sports_game_score AS loser_score,
sg2.sports_game_color AS loser_color,
sg2.sports_game_league AS loser_league,
sg2.sports_game_logo AS loser_logo,
sg2.sports_game_results AS loser_results,
sg2.sports_game_tla AS loser_tla
FROM sports_games sg 
LEFT JOIN sports_game_relations sgr 
ON winner_id = sgr.sports_game_relation_teams_one  
JOIN sports_games sg2 
ON loser_id = sgr.sports_game_relation_teams_two;

SELECT * FROM sports_games;
SELECT * FROM sports_game_relations;
SELECT * FROM sports_games_winners_losers ORDER BY winner_team_name ASC;



--------------------------------------------------
-- SEARCH

DROP TABLE IF EXISTS searchUsers;

CREATE VIRTUAL TABLE searchUsers USING FTS5 (
    user_id UNINDEXED,
    user_username,
    user_first_name,
    user_last_name,
    user_avatar
);

INSERT INTO searchUsers
SELECT user_id, user_username, user_first_name, user_last_name,user_avatar
FROM users;

DROP TABLE IF EXISTS searchTrends;

CREATE VIRTUAL TABLE searchTrends USING FTS5 (
    trend_id UNINDEXED,
    trend_topic,
    trend_total_tweets,
    trend_location
);

INSERT INTO searchTrends
SELECT trend_id, trend_topic, trend_total_tweets, trend_location
FROM trends;

