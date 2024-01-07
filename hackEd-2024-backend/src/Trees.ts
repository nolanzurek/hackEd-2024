import { parse } from 'csv-parse';
import fs from 'fs';
import { supabaseClient } from './supabase';

export function populateTrees() {
    const rows: unknown[] = [];

    fs.createReadStream('trees.csv')
        .pipe(parse({ delimiter: ',', fromLine: 2 }))
        .on('data', row => {
            const ID: string = row[0];
            const NEIGHBOURHOOD_NAME: string = row[1];
            const LOCATION_TYPE: string = row[2];
            const SPECIES_BOTANICAL: string = row[3];
            const SPECIES_COMMON: string = row[4];
            const GENUS: string = row[5];
            const SPECIES: string = row[6];
            const CULTIVAR: string = row[7];
            const DIAMETER_BREAST_HEIGHT: number = Number(row[8]);
            const CONDITION_PERCENT: number = Number(row[9]);
            const PLANTED_DATE: string = row[10];
            const OWNER: string = row[11];
            const BEARS_EDIBLE_FRUIT: boolean = row[12] === 'true' ? true : false;
            const TYPE_OF_EDIBLE_FRUIT: string = row[13];
            const COUNT: number = Number(row[14]);
            const LATITUDE: number = Number(row[15]);
            const LONGITUDE: number = Number(row[16]);

            rows.push({
                NEIGHBOURHOOD_NAME,
                LOCATION_TYPE,
                SPECIES_BOTANICAL,
                SPECIES_COMMON,
                GENUS,
                SPECIES,
                CULTIVAR,
                DIAMETER_BREAST_HEIGHT,
                CONDITION_PERCENT,
                PLANTED_DATE,
                OWNER,
                BEARS_EDIBLE_FRUIT,
                TYPE_OF_EDIBLE_FRUIT,
                COUNT,
                LATITUDE,
                LONGITUDE
            });
        })
        .on('end', async () => {
            console.log('starting to upload ???');
            const chunkSize = 2000;
            const chunks = [];
            for (let i=0; i<rows.length; i+=chunkSize) {
                chunks.push(rows.slice(i, i+chunkSize))
            }
            
            let count = 1;
            for (const chunk of chunks) {
                console.log('uploading', count++);
                await supabaseClient.from('trees').insert(chunk).then(console.log);
            }
        });
}