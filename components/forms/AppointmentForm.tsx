"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "../CustomFormField";
import { Form } from "@/components/ui/form";
import CustomSubmitButton from "../CustomSubmitButton";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FromFieldType } from "./PatientForm";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.type";

const AppointmentForm = ({
  userId,
  patientId,
  type,
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen: (open: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const AppointmentFormValidation = getAppointmentSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment?.primaryPhysician,
      schedule: appointment ? new Date(appointment?.schedule) : new Date(),
      reason: appointment ? appointment?.reason : "",
      note: appointment ? appointment?.note : "",
      cancellationReason: appointment ? appointment?.cancellationReason : "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        };

        const appointment = await createAppointment(appointmentData);

        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment.$id!,
          appointment: {
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date(values?.schedule),
            cancellationReason: values?.cancellationReason,
            status: status as Status,
          },
          type,
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          if (setOpen) {
            setOpen(false);
          }
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  let buttonLabel;

  switch (type) {
    case "cancel":
      buttonLabel = "Cancel appointment";
      break;
    case "create":
      buttonLabel = "Request appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule appointment";
      break;
    default:
      break;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds
            </p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FromFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor?.name} value={doctor?.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor?.image}
                      alt={doctor?.name}
                      height={32}
                      width={32}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor?.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FromFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormate="MM/dd/yyyy - h:mm aa"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FromFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason for appointment"
                placeholder="Enter reason for appointment"
              />
              <CustomFormField
                fieldType={FromFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Notes"
                placeholder="Enter notes"
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FromFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Enter for cancellation reason"
          />
        )}

        <CustomSubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-button" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </CustomSubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
