import { Injectable } from '@nestjs/common';
import { Track, TrackDocument } from './schemas/track.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  Comment,
  CommentDocument,
} from './schemas/Comment.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment';
import { FileService, FileType } from 'src/file/file.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name)
    private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name)
    private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateTrackDto): Promise<Track> {
    const audioPath = this.fileService.createFile(
      FileType.AUDIO,
      dto.audio,
    );
    const picturePath = this.fileService.createFile(
      FileType.IMAGE,
      dto.picture,
    );

    const { artist, text, name } = dto;
    const track = await this.trackModel.create({
      name,
      text,
      artist,
      audio: audioPath,
      picture: picturePath,
      listens: 0,
    });
    return track;
  }

  async getAll(): Promise<Track[]> {
    const tracks = await this.trackModel.find();
    return tracks;
  }

  async getOne(
    id: mongoose.Schema.Types.ObjectId,
  ): Promise<Track> {
    const track = await this.trackModel
      .findById(id)
      .populate('comments');

    return track;
  }

  async delete(
    id: mongoose.Schema.Types.ObjectId,
  ): Promise<mongoose.Schema.Types.ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track.id;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({
      ...dto,
    });

    track.comments.push(comment.id);
    await track.save();

    return comment;
  }
}
