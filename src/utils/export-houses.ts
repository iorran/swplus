import * as FileSystem from 'expo-file-system';
import ExcelJS from 'exceljs';
import { Buffer as NodeBuffer } from 'buffer';
import { IHouseAtom } from '../contexts/House';


// This returns a local uri that can be shared
export const generateShareableExcel = async (houses: IHouseAtom[]): Promise<string> => {
    const now = new Date();
    const fileName = `houses.xlsx`;
    const fileUri = FileSystem.cacheDirectory + fileName;
    return new Promise<string>((resolve, reject) => {
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'Me';
        workbook.created = now;
        workbook.modified = now;
        // Add a sheet to work on
        const worksheet = workbook.addWorksheet('My Sheet', {});
        // Just some columns as used on ExcelJS Readme
        worksheet.columns = [
            { header: '#', key: 'id', width: 10 },
            { header: 'Nome', key: 'name', width: 32 },
            { header: 'Adicionado em', key: 'createdAt', width: 32 },
        ];
        // Add some test data
        houses.forEach(house => worksheet.addRow(house));

        // Test styling

        // Style first row
        worksheet.getRow(1).font = {
            name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true
        };
        // Style second column
        worksheet.eachRow((row, rowNumber) => {
            row.getCell(2).font = {
                name: 'Arial Black',
                color: { argb: 'FF00FF00' },
                family: 2,
                size: 14,
                bold: true
            };
        });

        // Write to file
        workbook.xlsx.writeBuffer().then((buffer: ExcelJS.Buffer) => {
            // Do this to use base64 encoding
            const nodeBuffer = NodeBuffer.from(buffer);
            const bufferStr = nodeBuffer.toString('base64');
            FileSystem.writeAsStringAsync(fileUri, bufferStr, {
                encoding: FileSystem.EncodingType.Base64
            }).then(() => {
                resolve(fileUri);
            });
        });
    });
}