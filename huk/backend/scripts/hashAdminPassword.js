const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password || password.length < 8) {
  console.error("Usage: node scripts/hashAdminPassword.js <password-min-8-chars>");
  process.exit(1);
}

bcrypt.hash(password, 12).then((hash) => {
  console.log(hash);
});
