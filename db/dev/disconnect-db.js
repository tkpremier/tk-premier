import pool from './pool.js';

async function disconnect() {
  try {
    console.log('Disconnecting from database...');
    console.log('Pool status before disconnect:');
    console.log('  Total clients:', pool.totalCount);
    console.log('  Idle clients:', pool.idleCount);
    console.log('  Waiting clients:', pool.waitingCount);
    
    // Check if pool is already ending/ended
    if (pool.ended) {
      console.log('⚠️  Pool is already closed or closing.');
      process.exit(0);
    }
    
    // Close the pool - this will:
    // 1. Stop accepting new connections
    // 2. Wait for all active queries to finish (with a timeout)
    // 3. Close all idle connections
    await pool.end();
    
    // Verify the pool is closed
    if (pool.ended) {
      console.log('✅ Database connection pool closed successfully');
      console.log('All connections have been terminated.');
      
      // Test that queries are rejected
      try {
        await pool.query('SELECT 1');
        console.log('⚠️  WARNING: Pool appears to still accept queries!');
      } catch (testError) {
        if (testError.message && (testError.message.includes('ended') || testError.message.includes('end on the pool'))) {
          console.log('✅ Verified: Pool correctly rejects new queries.');
        } else {
          console.log('⚠️  Unexpected error testing pool:', testError.message);
        }
      }
      
      console.log('\nNote: If your application server is still running,');
      console.log('it may have its own pool instance. Close the server first.');
    } else {
      console.log('⚠️  Pool may not be fully closed. Check for active connections.');
    }
    
    process.exit(0);
  } catch (error) {
    // Check if error is because pool is already closed
    if (error.message && error.message.includes('ended')) {
      console.log('✅ Pool was already closed.');
      process.exit(0);
    }
    console.error('❌ Error disconnecting from database:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

disconnect();

