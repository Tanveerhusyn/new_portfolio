import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'

// Connection cache object
const connectionCache: {
  conn: any | null
  promise: Promise<any> | null
} = {
  conn: null,
  promise: null
}

export async function connectToDatabase() {
  // If we have a connection, return it
  if (connectionCache.conn) {
    return connectionCache.conn
  }

  // If we don't have a promise to connect yet, create one
  if (!connectionCache.promise) {
    const opts = {
      bufferCommands: false
    }

    connectionCache.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
      return mongoose
    })
  }

  try {
    // Wait for the connection
    connectionCache.conn = await connectionCache.promise
    return connectionCache.conn
  } catch (e) {
    // If there's an error, clear the promise so we can try again
    connectionCache.promise = null
    throw e
  }
}
