"use server";

import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, database, DATABASE_ID } from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types.ts";
import { revalidatePath } from "next/cache";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const newAppointment = await database.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            {
                ...appointment
            }
        );

        return parseStringify(newAppointment);
    } catch (error) {
        console.log(error);
    }
};

export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await database.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
        );
        return parseStringify(appointment);
    } catch (error) {
        console.log(error);
    }
};

export const getRecentAppointmentsList = async () => {
    try {
        const appointments = await database.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc("$createdAt")]
        );

        const initialCounts = {
            scheduledCount: 0,
            penddingCount: 0,
            cancelledCount: 0
        };

        const counts = (appointments.documents as Appointment[]).reduce((acc, appointments) => {
            if (appointments.status === "scheduled") {
                acc.scheduledCount += 1;
            }
            if (appointments.status === "pending") {
                acc.penddingCount += 1;
            }
            if (appointments.status === "cancelled") {
                acc.cancelledCount += 1;
            }
            return acc;
        }, initialCounts);

        const data = {
            totlaCount: appointments.total,
            ...counts,
            document: appointments.documents
        };
        return parseStringify(data);
    } catch (error) {
        console.log(error);
    }
};

export const updateAppointment = async ({ appointmentId, userId, appointment, type }: UpdateAppointmentParams) => {
    try {
        const updatedAppointment = await database.updateDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
            appointment
        );

        if (!updatedAppointment) throw new Error('Appointment not found.');

        //TODO: SMS notification

        revalidatePath('/admin');
        return parseStringify(updatedAppointment);
    } catch (error) {
        console.log(error);
    }
};