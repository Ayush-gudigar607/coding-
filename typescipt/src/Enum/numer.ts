enum UserRole {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST"
}

let role: UserRole = UserRole.Admin;
console.log(`Assigned role is: ${role}`);