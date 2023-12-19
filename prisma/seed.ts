import { db } from "../src/server/db";

async function main() {
  /* 1. create hospital */
  const { id: hospitalId, name: hospitalName } =
    await db.hospital.create({
      data: {
        name: "hospital1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  /* 2. create department */
  const {
    id: departmentId,
    name: departmentName,
    description: departmentDescription,
    hospitalId: departmentHospitalId,
  } = await db.department.create({
    data: {
      name: "department1",
      hospital: {
        connect: {
          id: hospitalId,
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  /* 3. create user: patient doctor admin */
  const {
    id: patientId,
    name: patientName,
    email: patientEmail,
    phone: patientPhone,
  } = await db.user.create({
    data: {
      name: "patient1",
      password: "123456",
      phone: "13000000001",
      hospital: {
        connect: {
          id: hospitalId,
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  const {
    id: doctorUserId,
    name: doctorUserName,
    email: doctorUserEmail,
    phone: doctorUserPhone,
  } = await db.user.create({
    data: {
      name: "doctor1",
      password: "123456",
      phone: "18000000001",
      hospital: {
        connect: {
          id: hospitalId,
        },
      },
      role: "DOCTOR",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  const {
    id: adminUserId,
    name: adminUserName,
    email: adminUserEmail,
    phone: adminUserPhone,
  } = await db.user.create({
    data: {
      name: "admin1",
      password: "123456",
      phone: "15000000001",
      hospital: {
        connect: {
          id: hospitalId,
        },
      },
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  /* 4. create doctor */
  const {
    id: doctorId,
    name: doctorName,
    level: doctorLevel,
    departmentId: doctorDepartmentId,
    hospitalId: doctorHospitalId,
  } = await db.doctor.create({
    data: {
      name: "doctor1",
      departmentId,
      hospitalId,
      level: "ATTENDING",
      user: {
        connect: {
          id: doctorUserId,
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  /* 5. create appointment */
  const {
    id: appointmentId,
    patientId: appointmentPatientId,
    doctorId: appointmentDoctorId,
    hospitalId: appointmentHospitalId,
    time: appointmentTime,
  } = await db.appointment.create({
    data: {
      patientId: patientId,
      doctorId,
      hospitalId,
      time: new Date(),
      status: "PENDING",
      description: "description1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  /* 6. create record */
  const {
    id: recordId,
    hospitalId: recordHospitalId,
    patientId: recordPatientId,
    doctorId: recordDoctorId,
    createdAt: recordCreatedAt,
    updatedAt: recordUpdatedAt,
  } = await db.medicalRecord.create({
    data: {
      hospitalId: hospitalId,
      patientId: patientId,
      doctorId: doctorId,
      texts: {
        createMany: {
          data: [
            {
              title: "title1",
              content: "content1",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              title: "title2",
              content: "content2",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
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
