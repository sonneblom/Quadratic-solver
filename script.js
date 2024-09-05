document.getElementById('quadratic-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values from the form
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);

    // Validate inputs
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        document.getElementById('roots').innerHTML = "Please enter valid numbers for a, b, and c.";
        document.getElementById('vertex').innerHTML = "";
        document.getElementById('y-intercept').innerHTML = "";
        document.getElementById('completed-square').innerHTML = "";
        document.getElementById('graph').innerHTML = "";
        return;
    }

    // Calculate the discriminant
    const discriminant = b * b - 4 * a * c;

    // Calculate roots
    let root1, root2;
    let rootsText;

    if (a === 0) {
        rootsText = "Coefficient 'a' cannot be zero in a quadratic equation.";
    } else if (discriminant > 0) {
        // Two real and distinct roots
        root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        rootsText = `The roots are x<sub>1</sub> = ${root1.toFixed(4)} and x<sub>2</sub> = ${root2.toFixed(4)}.`;
    } else if (discriminant === 0) {
        // One real root
        root1 = -b / (2 * a);
        rootsText = `The root is x = ${root1.toFixed(4)}.`;
    } else {
        // No real roots
        rootsText = "The equation has no real roots.";
    }

    // Calculate vertex
    const vertexX = -b / (2 * a);
    const vertexY = -discriminant / (4 * a);
    const vertexText = `The vertex of the parabola is at (${vertexX.toFixed(4)}, ${vertexY.toFixed(4)}).`;

    // Calculate y-intercept
    const yIntercept = c;
    const yInterceptText = `The y-intercept of the parabola is at (0, ${yIntercept.toFixed(4)}).`;

    // Completed square form
    const h = vertexX;
    const k = vertexY;
    const completedSquareForm = `${a}(x - ${h.toFixed(4)})<sup>2</sup> + ${k.toFixed(4)}`;
    const completedSquareText = `The completed square form of the quadratic equation is: ${completedSquareForm}.`;

    // Generate data for the plot
    const xValues = [];
    const yValues = [];
    for (let x = -10; x <= 10; x += 0.1) {
        const y = a * x * x + b * x + c;
        xValues.push(x);
        yValues.push(y);
    }

    const trace = {
        x: xValues,
        y: yValues,
        mode: 'lines',
        type: 'scatter',
        line: { color: '#00ff00', width: 2 }
    };

    const layout = {
        title: 'Graph of the Quadratic Equation',
        xaxis: { title: 'x' },
        yaxis: { title: 'y' },
        paper_bgcolor: '#222',
        plot_bgcolor: '#333',
        font: { color: '#e0e0e0' }
    };

    // Display results in their respective boxes
    document.getElementById('roots').innerHTML = rootsText;
    document.getElementById('vertex').innerHTML = vertexText;
    document.getElementById('y-intercept').innerHTML = yInterceptText;
    document.getElementById('completed-square').innerHTML = completedSquareText;

    // Plot the graph
    Plotly.newPlot('graph', [trace], layout);
});
