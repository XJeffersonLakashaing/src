const code = `
import java.awt.*;
import javax.swing.*;
public class Jframe {
	public static void main(String args[]) {
		try {
			JFrame frame = new JFrame("Jefferson");
			frame.setSize(350, 350);
			frame.setVisible(true);
		} catch (Exception e) {
			e.getMessage();
		}
  }
}
`;
CodeMirror.runMode(code, 'jsx', document.querySelector('code'));

activateClipboard(Array.prototype.slice.call(document.querySelectorAll('.code-sample')));

function activateClipboard(codeSamples) {
  console.log(codeSamples);
  codeSamples.forEach(codeSample => {
    const cleanAfter = 500;
    let timeout;
    const copyToClipboard = document.createElement('span');

    const setup = () => {
      clearTimeout(timeout);
      copyToClipboard.textContent = 'Copy to clipboard';
      copyToClipboard.classList.remove('clipboard-done');
      copyToClipboard.classList.add('clipboard');
    };

    const done = () => {
      copyToClipboard.classList.add('clipboard-done');
      copyToClipboard.textContent = 'Copied!';
    };

    const clipboard = new Clipboard(copyToClipboard, {
      text: () => codeSample.querySelector('code').textContent });


    setup();
    codeSample.querySelector('.heading').appendChild(copyToClipboard);
    copyToClipboard.addEventListener('mouseleave', setup, true);
    clipboard.on('success', () => {
      done();
      timeout = setTimeout(setup, cleanAfter);
    });
  });
}