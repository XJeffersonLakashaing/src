const code = `
/*
 * 
 */
// JProgressbar
import java.awt.*;
import javax.swing.*;
public class JProgressbar {
    static JFrame frame;
    static JProgressBar bar;
    public static void JFrameP() { 
        frame = new JFrame();
        bar = new JProgressBar();
        JPanel panel = new JPanel(); 
        frame.setSize(350,350);
        frame.setVisible(true);
        bar.setValue(0); 
        bar.setStringPainted(true); 
        panel.add(bar);
        frame.add(panel);
        fill();
    }
    public static void fill() {
        try{
            int i = 0;
            while(i <= 100){
                bar.setValue(i+10);
                Thread.sleep(1000);
                i += 10;  
            }
        }catch(Exception e){
            
        }
    }
    public static void main(String args[]) {
        JProgressbar in = new JProgressbar();
        in.JFrameP();
        in.fill();
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