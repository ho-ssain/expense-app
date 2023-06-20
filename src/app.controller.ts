import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ReportType } from './data';
import { AppService } from './app.service';
import { CreateReportDto, UpdateReportDto } from './dtos/report.dto';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Read all data
  @Get()
  getAllReport(@Param('type', new ParseEnumPipe(ReportType)) type: string) {
    const reporttype =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return this.appService.getAllReport(reporttype);
  }

  // Read by ID
  @Get(':id')
  getReportByID(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const reporttype =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return this.appService.getReportByID(reporttype, id);
  }

  // Create new data
  @Post()
  createReport(
    @Body() { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ) {
    const reporttype =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return this.appService.createReport(reporttype, { amount, source });
  }

  // Update a data
  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ) {
    const reporttype =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return this.appService.updateReport(reporttype, id, body);
  }

  // Delete a data
  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReport(id);
  }
}
