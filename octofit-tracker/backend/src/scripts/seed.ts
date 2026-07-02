import mongoose from 'mongoose'
import { mongoUri } from '../config/database'
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models'

async function seed() {
  console.log('Seed the octofit_db database with test data')
  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 })

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ])

  const users = await User.insertMany([
    {
      username: 'maya_runner',
      email: 'maya.runner@example.com',
      displayName: 'Maya Chen',
      profile: 'Trail runner training for a spring half marathon.',
    },
    {
      username: 'leo_lifts',
      email: 'leo.lifts@example.com',
      displayName: 'Leo Martinez',
      profile: 'Strength-focused athlete balancing lifting and mobility.',
    },
    {
      username: 'nora_rows',
      email: 'nora.rows@example.com',
      displayName: 'Nora Patel',
      profile: 'Rowing club captain who logs steady cardio sessions.',
    },
    {
      username: 'sam_cycles',
      email: 'sam.cycles@example.com',
      displayName: 'Sam Brooks',
      profile: 'Commuter cyclist building endurance through weekend rides.',
    },
  ])

  const teams = await Team.insertMany([
    {
      name: 'Cardio Crew',
      description: 'A team for runners, rowers, and cyclists chasing weekly mileage goals.',
      members: [users[0]._id, users[2]._id, users[3]._id],
    },
    {
      name: 'Power Builders',
      description: 'Strength and conditioning group focused on progressive overload.',
      members: [users[1]._id, users[3]._id],
    },
  ])

  await Activity.insertMany([
    {
      user: users[0]._id,
      activityType: 'Trail Run',
      durationMinutes: 52,
      caloriesBurned: 530,
      activityDate: new Date('2026-06-24T07:30:00Z'),
    },
    {
      user: users[1]._id,
      activityType: 'Strength Training',
      durationMinutes: 65,
      caloriesBurned: 410,
      activityDate: new Date('2026-06-25T18:00:00Z'),
    },
    {
      user: users[2]._id,
      activityType: 'Indoor Rowing',
      durationMinutes: 40,
      caloriesBurned: 360,
      activityDate: new Date('2026-06-26T06:45:00Z'),
    },
    {
      user: users[3]._id,
      activityType: 'Road Cycling',
      durationMinutes: 90,
      caloriesBurned: 780,
      activityDate: new Date('2026-06-27T09:15:00Z'),
    },
    {
      user: users[0]._id,
      activityType: 'Recovery Yoga',
      durationMinutes: 30,
      caloriesBurned: 120,
      activityDate: new Date('2026-06-28T19:30:00Z'),
    },
  ])

  await LeaderboardEntry.insertMany([
    { user: users[3]._id, team: teams[0]._id, score: 1420 },
    { user: users[0]._id, team: teams[0]._id, score: 1315 },
    { user: users[1]._id, team: teams[1]._id, score: 1180 },
    { user: users[2]._id, team: teams[0]._id, score: 990 },
  ])

  await Workout.insertMany([
    {
      title: 'Morning 5K Builder',
      description: 'Warm up, run steady intervals, then finish with light mobility.',
      difficulty: 'beginner',
      durationMinutes: 35,
      activities: ['Dynamic warmup', 'Run intervals', 'Cooldown walk', 'Hip mobility'],
    },
    {
      title: 'Full-Body Strength Circuit',
      description: 'Compound lifts and short rests for efficient strength conditioning.',
      difficulty: 'intermediate',
      durationMinutes: 50,
      activities: ['Goblet squats', 'Push presses', 'Romanian deadlifts', 'Plank holds'],
    },
    {
      title: 'Endurance Ride Progression',
      description: 'Aerobic cycling session with cadence blocks and a controlled finish.',
      difficulty: 'advanced',
      durationMinutes: 75,
      activities: ['Zone 2 ride', 'Cadence ladders', 'Tempo finish', 'Stretching'],
    },
  ])

  console.log('Seed complete: users, teams, activities, leaderboard, and workouts created')
}

seed()
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
  })