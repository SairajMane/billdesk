#include<bits/stdc++.h>
using namespace std;

void solve() {
    int n;
    cin >> n;
    unordered_map<int , int> mp;
    while(n) {
        int t = n % 10;
        mp[t]++;
        n /= 10;
    }
    int ans = 0;
    for(auto &m : mp) {
        if(m.first != 0 && n % m.second == 0) {
            ans += m.second;
        }
    }
    cout << ans << endl;
}

int main() {
    int t;
    cin >> t;
    while(t--)
    solve();
    return 0;
}