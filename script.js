
function showWelcome() {
    calculate_estimation();
}

function calculate_estimation() {
    const E = [2, 2.5,2.6, 2.7 , 2.8,2.9, 3];
    const n = [2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000];

    function f(x) {
        return 1 / x;
    }

    const x = Array.from({ length: 1000 }, (_, i) => 0.1 + 0.1 * i);
    const y = x.map(f);

    const Eesti = [];
    const M_slope = [];

    for (const x_esti of E) {
        const X_val = [];
        const Y_val = [];
        for (const T_Num of n) {
            const xmin = 1;
            const xmax = x_esti;
            const x_rand = Array.from({ length: T_Num }, () => Math.random() * 10);
            const y_rand = Array.from({ length: T_Num }, () => Math.random() * 10);
            const in_rect1 = x_rand.filter((xr, i) => xr >= xmin && xr <= xmax && y_rand[i] <= 1).length;
            const in_rect2 = x_rand.filter((xr, i) => xr >= xmin && xr <= xmax && y_rand[i] <= 1 / x_esti).length;
            const in_area = x_rand.filter((xr, i) => xr >= xmin && xr <= xmax && y_rand[i] <= f(xr)).length;
            const Ne = in_area;
            const Nu = in_rect1;
            const Ns = in_rect2;
            X_val.push(1 / Ns - 1 / Ne);
            Y_val.push(1 / Nu);
        }
            const { slope, intercept, r_value, p_value, std_err } = regression(X_val, Y_val);
            const r_squared = Math.pow(r_value, 2);
            Eesti.push(x_esti);
            M_slope.push(slope);
        }

            const { slope, intercept, r_value, p_value, std_err } = regression(M_slope, Eesti);
            const r_squared = Math.pow(r_value, 2);

            function myfunc(x) {
                return slope * x + intercept;
            }

            const all_esti = [myfunc(1)];

            function findAverage(lst) {
                if (!lst || lst.length === 0) {
                    return 0;
                }
                const total = lst.reduce((acc, val) => acc + val, 0);
                const average = total / lst.length;
                return average;
            }

            function calculatePercentage(average) {
                const diff = ((Math.abs(average - 2.71828) / 2.71828) * 100).toFixed(2);
                return diff
            }
            
            const average = findAverage(all_esti);
            const E_diff = calculatePercentage(average);

            // Display the percentage difference on your webpage
            var E_diff_container = document.getElementById("E_diff");
            E_diff_container.textContent = "ค่าความผิดพลาดจากค่า e จริง (%) : " + E_diff + "%";    
            
            //ส่ง E ไป
            var E_value = average;
            var E_value_container = document.getElementById("E_value");
            E_value_container.textContent = "่ค่า e ที่ประมาณได้เท่ากับ : " + E_value;




        }
        function calculatePercentage(average) {
            const diff = ((Math.abs(average - 2.71828) / 2.71828) * 100).toFixed(2);
            return diff;
        }
        // var E_diff = calculatePercentage(average);
        // var E_diff_container = document.getElementById("E_diff");
        // E_diff_container.textContent = E_diff;
      
        // Simple linear regression
        function regression(x, y) {
            const n = x.length;
            const x_mean = x.reduce((acc, val) => acc + val, 0) / n;
            const y_mean = y.reduce((acc, val) => acc + val, 0) / n;
            const numerator = x.reduce((acc, val, i) => acc + (val - x_mean) * (y[i] - y_mean), 0);
            const denominator = x.reduce((acc, val) => acc + Math.pow(val - x_mean, 2), 0);
            const slope = numerator / denominator;
            const intercept = y_mean - slope * x_mean;

            const x_values = x.map((val) => val * slope + intercept);
            const y_values = y;

            const r_value = correlationCoefficient(x_values, y_values);

            return { slope, intercept, r_value };
        }

        // Calculate the correlation coefficient
        function correlationCoefficient(x, y) {
            const x_mean = x.reduce((acc, val) => acc + val, 0) / x.length;
            const y_mean = y.reduce((acc, val) => acc + val, 0) / y.length;
            const numerator = x.reduce((acc, val, i) => acc + (val - x_mean) * (y[i] - y_mean), 0);
            const denominator = Math.sqrt(x.reduce((acc, val) => acc + Math.pow(val - x_mean, 2), 0) * y.reduce((acc, val) => acc + Math.pow(val - y_mean, 2), 0));

            const r = numerator / denominator;
            return r;
        }
        // // Define the value within the <script> tag
        // var scriptValue = "Value from script tag monkey";

        // // Find the output container element
        // var outputContainer = document.getElementById("output-container");

        // // Insert the value into the output container
        // outputContainer.textContent = scriptValue;
