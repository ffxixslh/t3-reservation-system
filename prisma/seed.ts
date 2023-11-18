import { db } from "../src/server/db";

async function main() {
  /* 1. create hospital */
  const { id: hospitalId, name: hospitalName } =
    await db.hospital.create({
      data: {
        name: "hospital1",
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
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
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    },
  });
  /* 3. create patient */
  const {
    id: patientId,
    name: patientName,
    email: patientEmail,
    phone: patientPhone,
    hospitalId: patientHospitalId,
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
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
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
      level: "MAIN",
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
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
      doctorId: doctorId,
      hospitalId: hospitalId,
      time: new Date().toLocaleString(),
      status: "PENDING",
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
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
