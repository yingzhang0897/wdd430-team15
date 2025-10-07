export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const users: User[] = [
  {
    id: "1",
    name: "Luna Artisan",
    email: "user@nextmail.com",
    password: "$2b$10$AICXH8ivr71I8ujteBPn3ev4H6n9g5oxdfszcIXxux9Jv1XDnXl5G",
  },
];

export async function getUserByEmail(email: string) {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
}
