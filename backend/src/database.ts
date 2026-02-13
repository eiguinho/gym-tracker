import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI não definida no .env');
    }
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(
      `❌ Erro ao conectar no MongoDB: ${(error as Error).message}`,
    );
    process.exit(1);
  }
};

export default connectDB;
