import { useQuery } from '@tanstack/react-query';
import { Avatar, List } from 'antd';
import axios from 'axios';
import { FC } from 'react';
import { z } from 'zod';
import { EDifficulty, TaskSchema } from '../create/types';
import { ResponseSchema } from '../../../types';

export const TaskList: FC = () => {
  const query = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await axios.get<
        ResponseSchema<z.infer<typeof TaskSchema>[]>
      >('http://localhost:8080/tasks');
      return response.data.data;
    },
  });

  return (
    <List
      itemLayout="vertical"
      loading={query.isLoading || query.isFetching}
      dataSource={query.data}
      renderItem={(task) => (
        <List.Item key={task.id}>
          <List.Item.Meta
            avatar={<Avatar>{EDifficulty[task.difficulty][0]}</Avatar>}
            title={task.title}
            description={task.description}
          />
        </List.Item>
      )}
    />
  );
};
