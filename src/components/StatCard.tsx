import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

interface StatCardProps {
    type: "appointments" | "pendding" | "cancelled";
    count: number;
    icon: string;
    label: string;
}

const StatCard = ({ count = 0, type, icon, label }: StatCardProps) => {
    return (
        <div className={clsx('stat-card', {
            'bg-appointments': type === "appointments",
            'bg-pending': type === "pendding",
            'bg-cancelled': type === "cancelled"
        })}>
            <div className='flex items-center gap-4'>
                <Image
                    src={icon}
                    height={32}
                    width={32}
                    alt={label}
                />
                <h2 className='text-32-bold text-white'>{count}</h2>
            </div>
            <p className='text-14-regular'>{label}</p>
        </div>
    );
};

export default StatCard;