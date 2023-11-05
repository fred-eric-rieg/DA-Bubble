import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { DatabaseService } from 'src/app/shared/services/database/database.service';
import { Subscription } from 'rxjs';

let channelSub: Subscription;

interface Tree {
  name: string;
  children?: Leaf[];
}

interface Leaf {
  name: string;
}

interface Channels {
  [key: string]: Channel;
}

interface Channel {
  name: string;
  description: string;
  members: string[];
  timestamp: number;
}

const TREE_DATA: Tree[] = [
  {
    name: 'Channels',
    children: [],
  },
  {
    name: 'Direct Messages',
    children: [ { name: 'User 1' }, { name: 'User 2' }, { name: 'User 3' }  ],
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit, OnDestroy {

  private _transformer = (node: Tree, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private ds: DatabaseService) {

  }


  async ngOnInit() {
    this.dataSource.data = TREE_DATA;
    await this.updateChannelLeafes();
  }

  ngOnDestroy() {
    channelSub.unsubscribe();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  /**
   * Updates the channel leafes with the current channels from the realtime database.
   */
  async updateChannelLeafes() {
    await this.ds.readAllChannels();
    
    channelSub = this.ds.channelSubject.subscribe((data: Channels) => {
      const channelLeafes: Leaf[] = [];
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          channelLeafes.push({ name: element.name });
        }
      }
      TREE_DATA[0].children = channelLeafes;
      this.dataSource.data = TREE_DATA;
    });
  }



}
