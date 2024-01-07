import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabase = createClient<Database>('https://dyklkvkrseaqqeepxahk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5a2xrdmtyc2VhcXFlZXB4YWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ1Nzc0OTcsImV4cCI6MjAyMDE1MzQ5N30.hmusX7tfLhdzR2OEPFmoRtoLevpPIBOmrWHLykPxENo');

export type TableNames = keyof Database['public']['Tables'];
export type TableData<TableName extends TableNames> = Database['public']['Tables'][TableName]['Row'];

/**
 * Fetches the data from a table in the supabase
 * @param table The name of the table to get data from
 * @returns The data in the table
 */
export async function fetchTableData<TableName extends TableNames>(tableName: TableName): Promise<TableData<TableName>[]> {
    let data: TableData<TableName>[] = [];
    const pageSize = 2000

    let index = 0;
    let currentPage: TableData<TableName>[] = [];
    do {
        currentPage = (await supabase.from(tableName).select('*').order('id').range(index, index + pageSize).returns<TableData<TableName>[]>()).data || [];
        
        data.push(...currentPage);
        index += pageSize;
    } while (currentPage.length >= pageSize)

    return data;
}