// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

const Clutter = imports.gi.Clutter;
const St = imports.gi.St;
const Main = imports.ui.main;

let button;
let extension_icon;
let color_effect;
let fx_ndx;

function _toggleEffect() {
    if (fx_ndx) {
        Main.uiGroup.remove_effect( color_effect[fx_ndx-1]);
    }
    fx_ndx = (fx_ndx + 1) % (color_effect.length+1);
    if (fx_ndx){	
        Main.uiGroup.add_effect( color_effect[fx_ndx-1]);
    }
}


function _tint(color) {
    fx = new Clutter.ColorizeEffect();
    cl = new Clutter.Color(color);
    fx.tint = cl;
    return fx;
}

function init() {
    //Creation of button
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    extension_icon = new St.Icon({ icon_name: 'applications-graphics-symbolic',
                                   style_class: 'system-status-icon' });
    button.set_child(extension_icon);

    //Creation of effect
    color_effect = [
			_tint( {red:255, green:128, blue: 0, alpha:255} ),
			_tint( {red:128, green:255, blue: 0, alpha:255} ),
			_tint( {red:0, green:224, blue: 255, alpha:255} ),
			_tint( {red:255, green:240, blue: 224, alpha:255} ),
			new Clutter.DesaturateEffect()
		]
    fx_ndx = 0;
    //Signal connection
    button.connect('button-press-event', _toggleEffect);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
