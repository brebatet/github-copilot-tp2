import mongoose, { type Model } from 'mongoose'

export type ApiCollection = 'users' | 'teams' | 'activities' | 'leaderboard' | 'workouts'

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    displayName: { type: String, required: true, trim: true },
    profile: { type: String, default: '' },
  },
  { timestamps: true }
)

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, default: '' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
)

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, default: 0, min: 0 },
    activityDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

const leaderboardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
)

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    durationMinutes: { type: Number, required: true, min: 0 },
    activities: [{ type: String, trim: true }],
  },
  { timestamps: true }
)

export const User = mongoose.model('User', userSchema)
export const Team = mongoose.model('Team', teamSchema)
export const Activity = mongoose.model('Activity', activitySchema)
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema)
export const Workout = mongoose.model('Workout', workoutSchema)

export const models: Record<ApiCollection, Model<any>> = {
  users: User,
  teams: Team,
  activities: Activity,
  leaderboard: LeaderboardEntry,
  workouts: Workout,
}

export const labels: Record<ApiCollection, string> = {
  users: 'user',
  teams: 'team',
  activities: 'activity',
  leaderboard: 'leaderboard entry',
  workouts: 'workout',
}