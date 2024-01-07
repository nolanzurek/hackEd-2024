import fs from 'fs';
import { parse } from 'csv-parse';
import { supabaseClient } from "./supabase";


export function populatePropertyAssesment() {
    const rows: unknown[] = [];

    fs.createReadStream('property_assessment.csv')
        .pipe(parse({ delimiter: ',', fromLine: 2 }))
        .on('data', row => {
            const ACCOUNT_NUMBER: number = Number(row[0]);
            const SUITE: string = row[1];
            const HOUSE_NUMBER: string = row[2];
            const STREET_NAME: string = row[3];
            const GARAGE: boolean = row[4] === 'Y';
            const NEIGHBOURHOOD_ID: number = Number(row[5]);
            const NEIGHBOURHOOD: string = row[6];
            const WARD: string = row[7];
            const ASSESSED_VALUE: string = row[8];
            const LATITUDE: number = Number(row[9]);
            const LONGITUDE: number = Number(row[10]);
            const POINT_LOCATION: string = row[11];
            const ASSESSMENT_CLASS_MOD_1: string = row[12];
            const ASSESSMENT_CLASS_MOD_2: string = row[13];
            const ASSESSMENT_CLASS_MOD_3: string = row[14];
            const ASSESSMENT_CLASS_1: string = row[15];
            const ASSESSMENT_CLASS_2: string = row[16];
            const ASSESSMENT_CLASS_3: string = row[17];

            rows.push({
                HOUSE_NUMBER,
                STREET_NAME,
                GARAGE,
                NEIGHBOURHOOD_ID,
                NEIGHBOURHOOD,
                ASSESSED_VALUE,
                LATITUDE,
                LONGITUDE,
                ASSESSMENT_CLASS_1
            });
        })
        .on('end', async () => {
            console.log('starting to upload property assessments');
            const chunkSize = 2000;
            const chunks = [];
            for (let i=0; i<rows.length; i+=chunkSize) {
                chunks.push(rows.slice(i,i+chunkSize));
            }

            let count = 1;
            for (const chunk of chunks) {
                console.log('uploading', count++);
                await supabaseClient.from('PropertyAssessments').insert(chunk).then(console.log);
            }
        });
}