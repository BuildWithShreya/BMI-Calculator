document.getElementById('bmiForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const bmi = weight / (height * height);
    
    let category = '';
    let advice = '';
    let genderAdvice = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
        advice = 'Consider gaining weight through a balanced diet and exercise.';
    } else if (bmi < 24.9) {
        category = 'Normal weight';
        advice = 'Maintain a healthy lifestyle with regular exercise and a balanced diet.';
    } else if (bmi < 29.9) {
        category = 'Overweight';
        advice = 'Consider a balanced diet and regular exercise to manage weight.';
    } else {
        category = 'Obesity';
        advice = 'Consult a healthcare provider for a personalized plan to manage weight.';
    }
    
    // Additional advice based on age
    if (age < 18) {
        advice += ' For children and teens, consult with a healthcare provider for appropriate growth assessments.';
    } else if (age >= 65) {
        advice += ' For older adults, focus on muscle mass and overall health, not just BMI.';
    }

    // Gender-specific advice
    if (gender === 'male') {
        genderAdvice = 'Men typically have more muscle mass, which can affect BMI interpretation. Focus on overall health and muscle strength.';
    } else if (gender === 'female') {
        genderAdvice = 'Women generally have a higher body fat percentage. Pay attention to overall health and balanced nutrition.';
    }
    
    document.getElementById('bmiResult').textContent = `BMI: ${bmi.toFixed(2)}`;
    document.getElementById('bmiCategory').textContent = `Category: ${category}`;
    document.getElementById('ageAdvice').textContent = `Advice: ${advice}`;
    document.getElementById('genderAdvice').textContent = `Gender-Specific Advice: ${genderAdvice}`;
    
    const ctx = document.getElementById('bmiChart').getContext('2d');
    const bmiChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['BMI', 'Remaining'],
            datasets: [{
                data: [bmi, 40 - bmi], // Adjust 40 to make pie chart visually effective
                backgroundColor: ['#FF6384', '#E7E9ED']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2);
                        }
                    }
                }
            }
        }
    });
});
