import { Controller, Get, Param, HttpException, HttpStatus, Body, Post, Delete, Query, UseGuards, UseInterceptors, UploadedFile, Res, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiQuery, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express'
import { StaffDto, UpdateStaffDto, CreateStaffDto } from 'src/shared/dto';
import { StaffService } from 'src/services';
import { Utils } from 'src/shared/utils';
import { JwtAuthGuard } from 'src/services/auth';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import * as path from 'path';
import { SERVER_PATH } from 'src/shared/constants';

@ApiTags('Staff')
@Controller('staff')
export class StaffController {

  constructor(private readonly staffService: StaffService) { }

  @Get()
  @ApiQuery({ name: 'search', description: 'Фильтрует клиента по ФИО или номер телефона', required: false })
  @ApiOperation({ summary: 'Возвращает список сотрудников' })
  @ApiOkResponse({ type: [StaffDto] })
  getStaff(@Query('search') search: string): StaffDto[] {
    return this.staffService
      .getAll()
      .map(staff => new StaffDto(staff))
      .filter(staff => {
        const findByName = Utils.compare(staff.fullName, search);
        return findByName;
      });
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Возвращает сотрудника по id' })
  @ApiOkResponse({ type: StaffDto })
  @ApiNotFoundResponse({ description: 'Сотрудник не найден' })
  getStaffById(@Param('id') id: number): StaffDto {
    const staff = this.staffService.get(+id);

    if (!staff) {
      throw new HttpException('Сотрудник не найден', HttpStatus.NOT_FOUND);
    }

    return new StaffDto(staff);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: path.join(__dirname, '../../public/'),
        filename: (req, file, cb) => {
          console.log(1);
          
          return cb(null, `${uuidv4()}${extname(file.originalname)}`)
        }
      })
    })
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Создаёт нового сотрудника' })
  @ApiCreatedResponse({ description: 'Сотрудник успешно создан', type: StaffDto })
  createStaff(@Body() createStaffDto: CreateStaffDto, @UploadedFile() photo): StaffDto {
    console.log(photo);
    
    const createdstaff = this.staffService.create({
      ...createStaffDto,
      photo: `${SERVER_PATH}/staff/photo/${photo.filename}`
    });

    return new StaffDto(createdstaff);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: path.join(__dirname, '../../public/'),
        filename: (req, file, cb) => {
          return cb(null, `${uuidv4()}${extname(file.originalname)}`)
        }
      })
    })
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Редактирует данные сотрудника' })
  @ApiNotFoundResponse({ description: 'Сотрудник не найден' })
  @ApiCreatedResponse({ description: 'Данные сотрудника отредактированы', type: StaffDto })
  updatetaff(
    @Param('id') id: number,
    @Body() updateStaffDto: UpdateStaffDto,
    @UploadedFile() photo
  ): StaffDto {
    const staff = this.staffService.get(+id);

    if (!staff) {
      throw new HttpException('Сотрудник не найден', HttpStatus.NOT_FOUND);
    }

    this.staffService.update({
      ...updateStaffDto,
      id,
      photo: `${SERVER_PATH}/staff/photo/${photo.filename}`
    });

    return new StaffDto(this.staffService.get(+id));
  }

  @Get('photo/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'public' });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удаляет сотрудника' })
  @ApiOkResponse({ description: 'Сотрудник успешно удалён' })
  @ApiNotFoundResponse({ description: 'Сотрудник не найден' })
  deleteStaff(@Param('id') id: number) {
    const staff = this.staffService.get(+id);

    if (staff) {
      this.staffService.delete(+id);
      return;
    }

    throw new HttpException('Сотрудник не найден', HttpStatus.NOT_FOUND);
  }

}
