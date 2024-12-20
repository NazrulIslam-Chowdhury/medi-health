import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { GetAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await GetAppointment(appointmentId);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment?.primaryPhysician
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-12 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={200}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center text-dark-800">
            Your <span className="text-green-500">appointment request</span> has
            been scheduled Successfully !
          </h2>
          <p className="text-dark-800">we'll be in touch soon.</p>
        </section>
        <section className="request-details text-dark-800">
          <p>Requested appointment details.</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image}
              height={100}
              width={100}
              alt="doctor"
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p>{formatDateTime(appointment?.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn">
          <Link href={`/patients/${userId}/new-appointment`}>
            New appointment
          </Link>
        </Button>

        <p className="copyright">© 2024 Medi-Health</p>
      </div>
    </div>
  );
};

export default Success;
