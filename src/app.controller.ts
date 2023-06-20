import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ReportType } from './data';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Read all data
  @Get()
  getAllReport(@Param('type') type: string) {
    const reporttype =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return this.appService.getAllReport(reporttype);
  }

  // Read by ID
  @Get(':id')
  getReportByID(@Param('type') type: string, @Param('id') id: string) {
    const reporttype =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return this.appService.getReportByID(reporttype, id);
  }

  // Create new data
  @Post()
  createReport(
    @Body() { amount, source }: { source: string; amount: number },
    @Param('type') type: string,
  ) {
    const reporttype =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return this.appService.createReport(reporttype, { amount, source });
  }

  // Update a data
  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { source: string; amount: number },
  ) {
    const reporttype =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return this.appService.updateReport(reporttype, id, body);
  }

  // Delete a data
  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    return this.appService.deleteReport(id);
  }
}
