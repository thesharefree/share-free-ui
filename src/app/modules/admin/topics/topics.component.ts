import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Query } from 'src/app/shared/models/query';
import { Topic } from 'src/app/shared/models/topic';
import { TopicsService } from 'src/app/shared/services/admin/topics.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements AfterViewInit {
  @ViewChild('topicPaginator', { read: MatPaginator })
  topicPaginator!: MatPaginator;
  @ViewChild('queryPaginator', { read: MatPaginator })
  queryPaginator!: MatPaginator;
  @ViewChild('topicSort', { read: MatSort }) topicSort!: MatSort;
  @ViewChild('querySort', { read: MatSort }) querySort!: MatSort;

  showCreateDiv: boolean = false;
  createForm: FormGroup = new FormGroup({});

  public topicsDataSource: MatTableDataSource<Topic> =
    new MatTableDataSource<Topic>([]);
  topicsColumns = ['name', 'actions'];
  editTopic: Topic = new Topic();
  public queriesDataSource: MatTableDataSource<Query> =
    new MatTableDataSource<Query>([]);
  queriesColumns = ['queryStr', 'target', 'options', 'optionType', 'actions'];

  constructor(private topicsService: TopicsService) {}

  ngAfterViewInit(): void {
    this.getAllTopics();
  }

  getAllTopics() {
    this.topicsService.getTopics().subscribe({
      next: (topics) => {
        this.topicsDataSource = new MatTableDataSource<Topic>(topics);
        this.topicsDataSource.sort = this.topicSort;
        this.topicsDataSource.paginator = this.topicPaginator;
      },
      error: (error) => {},
    });
    this.showCreateDiv = false;
  }

  toggle(topic: Topic) {
    this.topicsService.toggleTopic(topic._id).subscribe({
      next: () => {
        topic.active = !topic.active;
      },
      error: (error) => {},
    });
  }

  editTopicDiv(topic: Topic) {
    this.editTopic = topic;
    this.topicsService.getTopicQueries(topic._id).subscribe({
      next: (queries) => {
        this.queriesDataSource = new MatTableDataSource<Query>(queries);
        this.queriesDataSource.sort = this.querySort;
        this.queriesDataSource.paginator = this.queryPaginator;
      },
      error: (error) => {},
    });
  }

  xrefToggle(topicId: string, query: Query) {
    this.topicsService.toggleTopicQuery(topicId, query._id).subscribe({
      next: () => {
        query.xref = !query.xref;
      },
      error: (error) => {},
    });
  }

  createDiv() {
    this.createForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
    this.showCreateDiv = true;
  }

  create() {
    if (this.createForm.valid) {
      this.topicsService.createTopic(this.createForm.getRawValue()).subscribe({
        next: () => {
          this.getAllTopics();
        },
        error: (error) => {},
      });
    }
  }

  delete(topic: Topic) {
    if (confirm(`Delete ${topic.name}`)) {
      this.topicsService.deleteTopic(topic._id).subscribe({
        next: () => {
          this.getAllTopics();
        },
        error: (error) => {},
      });
    }
  }
}
