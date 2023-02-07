import Topic from 'src/domain/Topic';
type Data = { [prop: string]: number | boolean | string | Data } | Data[];

export type Message = {
  topic: Topic;
  eventType: string;
  data: Data;
};

export { Topic };
