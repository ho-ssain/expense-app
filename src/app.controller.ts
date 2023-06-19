import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReport(@Param('type') type: string) {
    const reporttype =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return data.report.filter((report) => report.type === reporttype);
  }

  @Get(':id')
  getReportByID(@Param('type') type: string, @Param('id') id: string) {
    const reporttype =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return data.report
      .filter((report) => report.type === reporttype)
      .find((report) => report.id === id);
  }

  @Post()
  createIncome(
    @Body() { amount, source }: { source: string; amount: number },
    @Param('type') type: string,
  ) {
    const newIncome = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.Income : ReportType.Expense,
    };
    data.report.push(newIncome);
    return newIncome;
  }

  @Put(':id')
  updateIncome(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { source: string; amount: number },
  ) {
    const reporttype =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    const reportUpdate = data.report
      .filter((report) => report.type === reporttype)
      .find((report) => report.id === id);
    if (!reportUpdate) return 'Report not found';

    const index = data.report.findIndex(
      (report) => report.id === reportUpdate.id,
    );
    data.report[index] = {
      ...data.report[index],
      ...body,
    };

    return data.report[index];
  }

  @Delete(':id')
  deleteIncome() {
    return 'This action removes a income';
  }
}
