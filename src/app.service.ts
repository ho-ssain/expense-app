import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';

interface Report {
  amount: number;
  source: string;
}

@Injectable()
export class AppService {
  getAllReport(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }

  getReportByID(type: ReportType, id: string) {
    return data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
  }

  createReport(type: ReportType, { amount, source }: Report) {
    const newIncome = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type,
    };
    data.report.push(newIncome);
    return newIncome;
  }

  updateReport(type: ReportType, id: string, { amount, source }: Report) {
    const reportUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    if (!reportUpdate) return 'Report not found';

    const index = data.report.findIndex(
      (report) => report.id === reportUpdate.id,
    );
    data.report[index] = {
      ...data.report[index],
      ...{ amount, source },
      updated_at: new Date(),
    };

    return data.report[index];
  }

  deleteReport(id: string) {
    const index = data.report.findIndex((report) => report.id === id);
    if (index === -1) return 'Report not found';
    data.report.splice(index, 1);
    return 'Report deleted';
  }
}
