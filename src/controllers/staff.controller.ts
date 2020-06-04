import { Controller, Get, Param, HttpException, HttpStatus, Body, Post, Delete, Query, UseGuards, UseInterceptors, UploadedFile, Res, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiQuery, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express'
import { StaffDto, UpdateStaffDto, CreateStaffDto } from 'src/shared/dto';
import { StaffService } from 'src/services';
import { Utils } from 'src/shared/utils';
import { JwtAuthGuard } from 'src/services/auth';
import { memoryStorage } from 'multer';
import { extname } from 'path';

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
  @UseInterceptors(FileInterceptor('photo', {
    storage: memoryStorage(),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
      } else {
        cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
      }
    }
  }))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Создаёт нового сотрудника' })
  @ApiCreatedResponse({ description: 'Сотрудник успешно создан', type: StaffDto })
  async createStaff(@Body() createStaffDto: CreateStaffDto, @UploadedFile() photo): Promise<StaffDto> {
    let photoUrl = '';

    try {
      photoUrl = await this.staffService.uploadPhoto(photo);
    } finally {
      const createdstaff = this.staffService.create({
        ...createStaffDto,
        photo: photoUrl
      });

      return new StaffDto(createdstaff);
    }
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo', {
    storage: memoryStorage(),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
      } else {
        cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
      }
    }
  }))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Редактирует данные сотрудника' })
  @ApiNotFoundResponse({ description: 'Сотрудник не найден' })
  @ApiCreatedResponse({ description: 'Данные сотрудника отредактированы', type: StaffDto })
  async updatetaff(
    @Param('id') id: number,
    @Body() updateStaffDto: UpdateStaffDto,
    @UploadedFile() photo
  ): Promise<StaffDto> {
    const staff = this.staffService.get(+id);

    if (!staff) {
      throw new HttpException('Сотрудник не найден', HttpStatus.NOT_FOUND);
    }

    let photoUrl = '';

    try {
      photoUrl = await this.staffService.uploadPhoto(photo);
    } finally {
      this.staffService.update({
        ...updateStaffDto,
        id,
        photo: photoUrl
      });

      return new StaffDto(this.staffService.get(+id));
    }
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
