import { FC, useCallback } from 'react';
import { Button, Card, Form, Input, Radio } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EDifficulty, TaskSchema } from '@/types/task';
import { createTask } from '@/api';

const FormSchema = TaskSchema.omit({ id: true });

const DifficultyValues = [
  EDifficulty.Trivial,
  EDifficulty.Easy,
  EDifficulty.Medium,
  EDifficulty.Hard,
];

export const TaskCreatePage: FC = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      difficulty: EDifficulty.Medium,
    },
  });
  const client = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => client.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const submitHandler = useCallback<SubmitHandler<z.infer<typeof FormSchema>>>(
    (values) => createTaskMutation.mutateAsync(values),
    [createTaskMutation]
  );

  return (
    <Card title="New task">
      <Form
        layout="vertical"
        onFinish={form.handleSubmit(submitHandler)}
      >
        <Form.Item label="Title">
          <Controller
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                status={fieldState.error ? 'error' : undefined}
              />
            )}
          />
        </Form.Item>

        <Form.Item label="Difficulty">
          <Controller
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <Radio.Group
                {...field}
                buttonStyle="solid"
              >
                {DifficultyValues.map((value) => (
                  <Radio.Button
                    key={value}
                    value={value}
                  >
                    {EDifficulty[value]}
                  </Radio.Button>
                ))}
              </Radio.Group>
            )}
          />
        </Form.Item>

        <Form.Item label="Description">
          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Input.TextArea
                {...field}
                rows={6}
                status={fieldState.error ? 'error' : undefined}
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button
            block
            htmlType="submit"
            type="primary"
            disabled={
              form.formState.disabled ||
              form.formState.isValidating ||
              form.formState.isSubmitting ||
              !form.formState.isValid
            }
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
