import { Block } from '../../utils/Block';
import Handlebars from 'handlebars';
import profileTemplate from './profile.hbs?raw';
import { Data } from '../../utils/Data';

export class ProfilePage extends Block {
  protected render(): HTMLElement | null {
    const template = Handlebars.compile(profileTemplate);
    
    // Leemos los datos centralizados y se los inyectamos a Handlebars
    const userData = Data.getInstance().getUser();
    return this.compile(template, userData);
  }
}