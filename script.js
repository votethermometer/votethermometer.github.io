document.getElementById('thermometerForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission

  const goal = parseFloat(document.getElementById('goal').value);
  const raised = parseFloat(document.getElementById('raised').value);

  const goalError = document.getElementById('goalError');
  const raisedError = document.getElementById('raisedError');

  // Reset error messages
  goalError.style.display = 'none';
  raisedError.style.display = 'none';

  // Validate inputs
  let valid = true;
  if (isNaN(goal) || goal <= 0) {
    goalError.textContent = 'Please enter a valid fundraising goal greater than 0.';
    goalError.style.display = 'block';
    valid = false;
  }
  if (isNaN(raised) || raised < 0 || raised > goal) {
    raisedError.textContent =
      'Please enter a valid amount raised (between 0 and the goal amount).';
    raisedError.style.display = 'block';
    valid = false;
  }
  if (!valid) return;

  // Calculate the fill percentage
  const percentage = Math.min((raised / goal) * 100, 100);

  // Update the thermometer fill and text
  const fill = document.querySelector('.thermometer .fill');
  const outputText = document.getElementById('outputText');

  fill.style.height = `${percentage}%`;
  outputText.textContent = `We've raised $${raised.toLocaleString()} of your $${goal.toLocaleString()} goal! (${percentage.toFixed(2)}%)`;

  // Generate the thermometer image
  const outputDiv = document.getElementById('thermometerOutput');

  html2canvas(outputDiv, {
    allowTaint: true,
    useCORS: true,
  }).then(function (canvas) {
    console.log('Canvas created successfully!'); // Debug log

    const link = document.createElement('a');
    link.download = 'fundraising-thermometer.png';
    link.href = canvas.toDataURL('image/png');
    link.textContent = 'Download Thermometer';
    link.style.display = 'block';
    link.style.marginTop = '10px';

    // Remove previous download link if exists
    const existingLink = outputDiv.querySelector('a');
    if (existingLink) {
      existingLink.remove();
      console.log('Previous download link removed.');
    }

    outputDiv.appendChild(link);
    console.log('Download link appended successfully.');
  }).catch(function (error) {
    console.error('Error generating canvas:', error);
  });
});

