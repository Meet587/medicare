"use server";

import { ID } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, database, DATABASE_ID } from "../appwrite.config";
import { parseStringify } from "../utils";

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