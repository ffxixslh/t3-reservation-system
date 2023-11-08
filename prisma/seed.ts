import { db } from "../src/server/db";

async function main() {
  // await db.user.create({
  //   data: {
  //     name: "John Doe",
  //     email: "john@doe.com",
  //     password: "john@doe",
  //     phone: "13000000000",
  //   },
  // });
  // await db.department.create({
  //   data: {
  //     name: "内科",
  //   },
  // });
  // await db.doctor.create({
  //   data: {
  //     name: "Dr. Lee",
  //     deptId: 1,
  //     level: "MAIN",
  //   },
  // });
  // await db.appointment.create({
  //   data: {
  //     patientId: 1,
  //     doctorId: 1,
  //     time: new Date(),
  //     status: "PENDING",
  //   },
  // });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
