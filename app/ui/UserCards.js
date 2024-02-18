import React, { memo, useState } from "react";
import { Card, Image, Text, Button, Group, Center } from "@mantine/core";
import {
  IconUserPlus,
  IconTrash,
  IconStar,
  IconAt,
  IconPhoneCall,
  IconWorld,
} from "@tabler/icons-react";
import { DICEBEAR_API_URL } from "@components/pages/api/config";

const UserCards = memo(({ user, onDelete }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleDelete = () => {
    onDelete(user.id);
  };

  const handleToggleFollow = () => {
    setIsFollowing((prevState) => !prevState);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Center>
        <Image
          src={`${DICEBEAR_API_URL}?seed=${user.name}`}
          alt={user.name}
          radius="100"
          h={120}
          w="120"
          fit="contain"
        />
      </Center>

      <Group justify="center" mb={"sm"}>
        <Text fw={700}>{user.name}</Text>
        {isFollowing ? <IconStar size={16} /> : null}
      </Group>

      <Group justify="flex-start">
        <IconAt size={16} color="var(--mantine-color-dimmed)" />
        <Text c="dimmed">{user.email}</Text>
      </Group>

      <Group justify="flex-start">
        <IconPhoneCall size={16} color="var(--mantine-color-dimmed)" />
        <Text c="dimmed">{user.phone}</Text>
      </Group>

      <Group justify="flex-start">
        <IconWorld size={16} color="var(--mantine-color-dimmed)" />
        <Text c="dimmed">{user.website}</Text>
      </Group>

      <Group mt={"md"} grow>
        {isFollowing ? (
          <Button
            leftSection={<IconUserPlus size={16} />}
            onClick={handleToggleFollow}
            variant="default"
          >
            Unfollow
          </Button>
        ) : (
          <Button
            leftSection={<IconUserPlus size={16} />}
            onClick={handleToggleFollow}
          >
            Follow
          </Button>
        )}
        <Button
          leftSection={<IconTrash size={16} />}
          variant="outline"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Group>
    </Card>
  );
});

export default UserCards;

UserCards.displayName = "UserCards";
