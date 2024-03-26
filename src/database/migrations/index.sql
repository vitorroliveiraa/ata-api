CREATE TABLE IF NOT EXISTS SacramentMeeting (
	id SERIAL PRIMARY KEY,
	date DATE NOT NULL,
	attendance SMALLINT NOT NULL,
	chairedBy VARCHAR(255) NOT NULL,
	headedBy VARCHAR(255) NOT NULL,
	authorities VARCHAR(510) [],
	visitors VARCHAR(510) [],
	regent VARCHAR(255),
	organ VARCHAR(255),
	firstHymn SMALLINT NOT NULL,
	firstPrayer VARCHAR(255) NOT NULL,
	sacramentHymn SMALLINT NOT NULL,
	firstSpeaker VARCHAR(255),
	secondSpeaker VARCHAR(255),
	specialHymn SMALLINT,
	thirdSpeaker VARCHAR(255),
	lastHymn SMALLINT NOT NULL,
	lastPrayer VARCHAR(255) NOT NULL,
	observations TEXT
);
CREATE TABLE IF NOT EXISTS SustainingAndReleasing (
	id SERIAL PRIMARY KEY,
	idSacrament INT REFERENCES SacramentMeeting(id),
	name VARCHAR(255),
	called VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS Announcements (
	id SERIAL PRIMARY KEY,
	idSacrament INT REFERENCES SacramentMeeting(id),
	announcement TEXT
);
CREATE TABLE IF NOT EXISTS Testimonies (
	id SERIAL PRIMARY KEY,
	idSacrament INT REFERENCES SacramentMeeting(id),
	name VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS Church_members (id SERIAL PRIMARY KEY, name VARCHAR(300));