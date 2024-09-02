import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT motor_command FROM cyd042 ORDER BY id DESC LIMIT 1');
    client.release();
    const motorCommand = result.rows[0] ? result.rows[0].motor_command : '';
    return NextResponse.json({ motor_command: motorCommand });
  } catch (error) {
    console.error('Error fetching motor command:', error);
    return NextResponse.json({ error: 'Failed to fetch motor command' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { motor_command } = await request.json();
    
    const client = await pool.connect();
    await client.query('INSERT INTO cyd042 (motor_command) VALUES ($1)', [motor_command]);
    client.release();
    
    return NextResponse.json({ message: 'Motor command saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving motor command:', error);
    return NextResponse.json({ error: 'Failed to save motor command' }, { status: 500 });
  }
}
