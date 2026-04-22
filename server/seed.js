require('dotenv').config();
const connectDB = require('./config/db');

const User = require('./models/User');
const Song = require('./models/Song');
const Comment = require('./models/Comment');
const Rating = require('./models/Rating');

const PLAIN_PASSWORD = 'password123'; // Model pre-save hook hashes this automatically

const seed = async () => {
  await connectDB();

  // Clear existing data
  await User.deleteMany({});
  await Song.deleteMany({});
  await Comment.deleteMany({});
  await Rating.deleteMany({});
  console.log('🗑  Cleared existing data');

  // Create users — passwords are hashed by the User model pre-save hook
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@jamreviewer.com',
    password: PLAIN_PASSWORD,
    role: 'ADMIN',
  });

  const creator1 = await User.create({
    name: 'Arijit Singh',
    email: 'arijit@jamreviewer.com',
    password: PLAIN_PASSWORD,
    role: 'CREATOR',
  });

  const creator2 = await User.create({
    name: 'Neha Kakkar',
    email: 'neha@jamreviewer.com',
    password: PLAIN_PASSWORD,
    role: 'CREATOR',
  });

  const user1 = await User.create({
    name: 'Rahul Sharma',
    email: 'rahul@jamreviewer.com',
    password: PLAIN_PASSWORD,
    role: 'USER',
  });

  const user2 = await User.create({
    name: 'Priya Patel',
    email: 'priya@jamreviewer.com',
    password: PLAIN_PASSWORD,
    role: 'USER',
  });

  console.log('👤 Created users');

  // Create songs (using a public sample audio URL for demo)
  const sampleAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  const samplePublicId = 'jamreviewer/songs/sample_song';

  const songs = await Song.insertMany([
    {
      title: 'Tum Hi Ho',
      fileUrl: sampleAudioUrl,
      publicId: samplePublicId,
      creatorId: creator1._id,
      singer: 'Arijit Singh',
      movie: 'Aashiqui 2',
      year: 2013,
      playCount: 1580,
    },
    {
      title: 'Kesariya',
      fileUrl: sampleAudioUrl,
      publicId: samplePublicId,
      creatorId: creator1._id,
      singer: 'Arijit Singh',
      movie: 'Brahmastra',
      year: 2022,
      playCount: 2340,
    },
    {
      title: 'Chaleya',
      fileUrl: sampleAudioUrl,
      publicId: samplePublicId,
      creatorId: creator1._id,
      singer: 'Arijit Singh, Shilpa Rao',
      movie: 'Jawan',
      year: 2023,
      playCount: 1902,
    },
    {
      title: 'O Saathi',
      fileUrl: sampleAudioUrl,
      publicId: samplePublicId,
      creatorId: creator2._id,
      singer: 'Atif Aslam',
      movie: 'Baaghi 2',
      year: 2018,
      playCount: 987,
    },
    {
      title: 'Dilbar',
      fileUrl: sampleAudioUrl,
      publicId: samplePublicId,
      creatorId: creator2._id,
      singer: 'Neha Kakkar',
      movie: 'Satyameva Jayate',
      year: 2018,
      playCount: 1123,
    },
    {
      title: 'Raataan Lambiyan',
      fileUrl: sampleAudioUrl,
      publicId: samplePublicId,
      creatorId: creator2._id,
      singer: 'Jubin Nautiyal, Asees Kaur',
      movie: 'Shershaah',
      year: 2021,
      playCount: 3410,
    },
    {
      title: 'Apna Bana Le',
      fileUrl: sampleAudioUrl,
      publicId: samplePublicId,
      creatorId: creator1._id,
      singer: 'Arijit Singh',
      movie: 'Bhediya',
      year: 2022,
      playCount: 760,
    },
    {
      title: 'Mere Dholna Sun',
      fileUrl: sampleAudioUrl,
      publicId: samplePublicId,
      creatorId: creator2._id,
      singer: 'Shreya Ghoshal',
      movie: 'Bhool Bhulaiyaa',
      year: 2007,
      playCount: 445,
    },
  ]);

  console.log(`🎵 Created ${songs.length} songs`);

  // Add ratings
  const ratingData = [
    { userId: user1._id, songId: songs[0]._id, rating: 5 },
    { userId: user2._id, songId: songs[0]._id, rating: 4 },
    { userId: user1._id, songId: songs[1]._id, rating: 5 },
    { userId: user2._id, songId: songs[1]._id, rating: 5 },
    { userId: admin._id, songId: songs[1]._id, rating: 4 },
    { userId: user1._id, songId: songs[2]._id, rating: 4 },
    { userId: user2._id, songId: songs[2]._id, rating: 3 },
    { userId: user1._id, songId: songs[3]._id, rating: 4 },
    { userId: user2._id, songId: songs[4]._id, rating: 5 },
    { userId: user1._id, songId: songs[5]._id, rating: 5 },
    { userId: user2._id, songId: songs[5]._id, rating: 5 },
    { userId: admin._id, songId: songs[5]._id, rating: 5 },
    { userId: user1._id, songId: songs[6]._id, rating: 4 },
    { userId: user2._id, songId: songs[7]._id, rating: 3 },
  ];

  await Rating.insertMany(ratingData);
  console.log(`⭐ Created ${ratingData.length} ratings`);

  // Add comments
  const commentData = [
    { userId: user1._id, songId: songs[0]._id, text: 'One of the most beautiful songs ever made. Arijit is a genius!' },
    { userId: user2._id, songId: songs[0]._id, text: 'This song hits different at 3am. Pure emotion.' },
    { userId: admin._id, songId: songs[1]._id, text: 'Kesariya is absolutely magical. The music is breathtaking.' },
    { userId: user1._id, songId: songs[1]._id, text: 'Ranbir and Alia\'s chemistry + this song = perfection.' },
    { userId: user2._id, songId: songs[2]._id, text: 'Chaleya is my anthem for 2023!' },
    { userId: user1._id, songId: songs[3]._id, text: 'Atif Aslam\'s voice is unmatched. This song is soulful.' },
    { userId: user2._id, songId: songs[4]._id, text: 'Neha never disappoints. Such energy!' },
    { userId: user1._id, songId: songs[5]._id, text: 'Raataan Lambiyan is the best romantic song of 2021.' },
    { userId: user2._id, songId: songs[5]._id, text: 'I cry every time I hear this because of Shershaah. 😢' },
    { userId: admin._id, songId: songs[5]._id, text: 'A tribute song that became immortal.' },
    { userId: user1._id, songId: songs[6]._id, text: 'Apna Bana Le is so underrated. It deserves more plays!' },
  ];

  await Comment.insertMany(commentData);
  console.log(`💬 Created ${commentData.length} comments`);

  console.log('\n✅ Database seeded successfully!\n');
  console.log('📋 Demo Accounts:');
  console.log('─────────────────────────────────────────');
  console.log('ADMIN   → admin@jamreviewer.com    / password123');
  console.log('CREATOR → arijit@jamreviewer.com   / password123');
  console.log('CREATOR → neha@jamreviewer.com     / password123');
  console.log('USER    → rahul@jamreviewer.com    / password123');
  console.log('USER    → priya@jamreviewer.com    / password123');
  console.log('─────────────────────────────────────────\n');

  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
