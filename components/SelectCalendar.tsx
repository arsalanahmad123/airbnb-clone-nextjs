'use client';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { DateRange } from 'react-date-range';
import { useState } from 'react';
import { eachDayOfInterval } from 'date-fns';

export function SelectCalendar({
    reservation,
}: {
    reservation:
        | {
              startDate: Date;
              endDate: Date;
          }[]
        | undefined;
}) {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);

    let DisabledDates: Date[] = [];
    reservation?.forEach((reservationItem) => {
        const daterange = eachDayOfInterval({
            start: new Date(reservationItem.startDate),
            end: new Date(reservationItem.endDate),
        });
        DisabledDates.push(...daterange);
    });

    return (
        <>
            <input
                type="hidden"
                name="startDate"
                value={state[0].startDate.toISOString()}
            />
            <input
                type="hidden"
                name="endDate"
                value={state[0].endDate.toISOString()}
            />
            <DateRange
                date={new Date()}
                showDateDisplay={false}
                rangeColors={['#FF5A5F']}
                ranges={state}
                onChange={(item) => setState([item.selection] as any)}
                minDate={new Date()}
                direction="vertical"
                disabledDates={DisabledDates}
            />
        </>
    );
}
