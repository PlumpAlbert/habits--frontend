import { useQuery } from '@tanstack/react-query';
import { Avatar, List } from 'antd';
import { FC } from 'react';
import { EDifficulty } from '@/types/task';
import { getTasks } from '@/api';

export const TaskList: FC = () => {
  const query = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
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
