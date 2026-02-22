const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('Checking database connection...\n');
    
    // Try to query users
    const users = await prisma.user.findMany();
    console.log(`✓ Database connected successfully!`);
    console.log(`✓ Found ${users.length} user(s) in database\n`);
    
    if (users.length === 0) {
      console.log('⚠ No users found. Creating default admin user...\n');
      
      const newUser = await prisma.user.create({
        data: {
          email: 'admin@example.com',
          password: 'admin123',
          name: 'Admin',
          role: 'ADMIN'
        }
      });
      
      console.log('✓ Default admin user created:');
      console.log(`  Email: ${newUser.email}`);
      console.log(`  Password: admin123`);
      console.log(`  Role: ${newUser.role}\n`);
    } else {
      console.log('Existing users:');
      users.forEach(user => {
        console.log(`  - ${user.email} (${user.role})`);
      });
      console.log();
    }
    
    console.log('✓ MongoDB replica set is working correctly!');
    console.log('✓ You can now use your application.');
    
  } catch (error) {
    console.error('✗ Database error:', error.message);
    
    if (error.message.includes('replica set')) {
      console.log('\n⚠ MongoDB needs to be configured as a replica set.');
      console.log('\nFollow these steps:');
      console.log('1. Stop MongoDB service: net stop MongoDB');
      console.log('2. Run: start-mongodb-replica.bat');
      console.log('3. In a new terminal, run: init-replica-set.bat');
      console.log('4. Run this script again: node check-db.js');
    }
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
