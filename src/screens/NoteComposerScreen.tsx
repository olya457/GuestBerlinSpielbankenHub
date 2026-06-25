import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../components/AppText';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {Field} from '../components/Field';
import {Header} from '../components/Header';
import {Screen} from '../components/Screen';
import {useApp} from '../context/AppContext';
import {useNavigation} from '../navigation/NavigationContext';
import {colors} from '../theme';

export function NoteComposerScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const {actions} = useApp();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const save = () => {
    actions.saveNote({title, body});
    navigation.popToTabs('notes');
  };

  return (
    <Screen>
      <Header title="Private Note" back />
      <Card style={styles.summary} accent>
        <AppText variant="section">Local notebook entry</AppText>
        <AppText muted>
          Notes stay on this device through the app storage layer and do not contact Spielbank Berlin.
        </AppText>
      </Card>
      <View style={styles.form}>
        <AppText variant="caption" muted>
          Title
        </AppText>
        <Field value={title} onChangeText={setTitle} placeholder="e.g. Limit, route, game to check" />
        <AppText variant="caption" muted>
          Note
        </AppText>
        <Field
          value={body}
          onChangeText={setBody}
          placeholder="Write a private reminder for your visit"
          multiline
          style={styles.bodyField}
        />
      </View>
      <Card style={styles.notice}>
        <AppText style={styles.noticeText}>
          For current opening changes, event details, and official requests, use the official website or phone numbers.
        </AppText>
      </Card>
      <View style={styles.footer}>
        <Button title="Cancel" variant="ghost" onPress={navigation.back} style={styles.cancel} />
        <Button title="Save Note" onPress={save} style={styles.submit} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: {
    padding: 14,
    gap: 8,
    marginBottom: 16,
  },
  form: {
    gap: 8,
  },
  bodyField: {
    minHeight: 140,
  },
  notice: {
    backgroundColor: '#071f14',
    borderColor: '#17452e',
    padding: 14,
    marginTop: 16,
  },
  noticeText: {
    color: colors.green,
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    gap: 8,
    paddingTop: 20,
  },
  cancel: {
    flex: 1,
  },
  submit: {
    flex: 2,
  },
});
