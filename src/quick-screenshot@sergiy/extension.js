import St from 'gi://St';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as Util from 'resource:///org/gnome/shell/misc/util.js';

export default class QuickScreenshotExtension {
  enable() {
    this._button = new PanelMenu.Button(0.0, 'Quick Screenshot', false);
    const icon = new St.Icon({ icon_name: 'camera-photo-symbolic', style_class: 'system-status-icon' });
    this._button.add_child(icon);
    this._button.set_tooltip_text('Open Screenshot UI');
    this._button.connect('button-press-event', () => this._openScreenshot());
    Main.panel.addToStatusArea('quick-screenshot', this._button, 1, 'right');
  }

  _openScreenshot() {
    const cmd = `gdbus call --session --dest org.gnome.Shell --object-path /org/gnome/Shell --method org.gnome.Shell.Eval "Main.screenshotUI.open();"`;
    Util.spawn(['bash', '-lc', cmd]);
  }

  disable() {
    if (this._button) { this._button.destroy(); this._button = null; }
  }
}
