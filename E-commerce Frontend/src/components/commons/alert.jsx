import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

function AlertMantine() {
  const icon = <IconInfoCircle />;
  return (
    <Alert variant="light" color="blue" radius="md" withCloseButton title="Anashe" icon={icon}>
      Mensaje idooo brother
    </Alert>
  );
}

export default AlertMantine;